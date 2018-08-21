let fs = require('fs');
let path = require('path');
let cmd = require('node-cmd');

// Helpers
let log = require('./base/helpers/envlog');
let makefile = require('./base/helpers/makefile');
let string_ = require('./base/helpers/string');

module.exports = function(res, next, options) {
  let createTask = {
    model: true,
    controller: true,
    view: true,
    route: true
  }

  // set literal path
  let literals = {
    router_file: './base/literals/routes-file',
    controller: './base/literals/controller',
    model: './base/literals/model',
    router: './base/literals/routes'
  }
  
  if (options.api) {
    literals.controller = './base/literals/api/controller';
    literals.router = './base/literals/api/routes';
    createTask.view = false;
  }

  // validate resource
  if (!res) {
    throw console.error("resource not defined. ("+res+")");
  }

  /// STEP 1. Start: Load libraries and paths ///

  log("\n");
  log("# Start: Load libraries and paths");
  log('1. Check helpers load ~>', typeof log === 'function', typeof makefile === 'function');

  const rootpath = process.env.PWD; // TODO: Need to change stable path wherever running command.
  const pkgpath = __dirname;
  let resource = string_.normalizer(res);
  log('2. Check app project rootpath ~>', rootpath);
  log('3. Check pkg project rootpath ~>', pkgpath);
  log('4. Check argumented resource name ~>', resource);

  let invoke_callback = function(err, inputs) {
    console.log('invoke', inputs.path.replace(rootpath, '').replace(/\//, "\t\t"));
  }


  /// STEP 2. Generate Necessary files ///
  if (Object.values(createTask).includes(true)) {
    
    log("\n");
    log("# Generate Necessary files");

    // [Dir] core/
    fs.stat(`${rootpath}/core`, function(err, stats) {
      if (err && (err.errno === 34 || err.errno === -2)) {
        log("<~(async) Making directory ...", `${rootpath}/core`);
        cmd.run(`cp -r ${pkgpath}/base/core ${rootpath}/core`);
      }
    });

    // [File] routes.js
    let routerpath = path.join(rootpath, 'routes', 'routes.js');
    fs.access(routerpath, (err) => {
      if(err && (err.errno === -2 || err.errno === 34)) {
        makefile(routerpath, require(literals.router_file), invoke_callback);
      };
    });

    // [Dir] views/
    let view_dirpath = path.join(rootpath, 'views');
    fs.mkdir(view_dirpath, (err) => {
        log(err);
    });
  }
  

  /// STEP 3. Generate Controller file ///
  if (createTask.controller) {
    
    log("\n");
    log("# Generate Controller file");

    // Generate Controller file

    const controller_filename = `${resource}.js`;
    const controller_filepath = path.join(rootpath, 'controllers', controller_filename);
    const controller_literal = require(literals.controller)(resource);
    makefile(controller_filepath, controller_literal, invoke_callback);
    log('1. Check "controller_filename" ~>', controller_filename);
    log('2. Check "controller_filepath" ~>', controller_filepath);
    log('3. Check "controller_literal" ~>', typeof controller_literal === 'string');
  }
  


  /// STEP 4. Generate Model file ///
  if (createTask.model) {
  
    log("\n");
    log("# Generate Model file");

    // Generate Model file

    const model_filename = `${resource}.js`;
    const model_filepath = path.join(rootpath, 'models', model_filename);
    const model_literal = require(literals.model)(resource);
    makefile(model_filepath, model_literal, invoke_callback);
    log('1. Check "model_filename" ~>', model_filename);
    log('2. Check "model_filepath" ~>', model_filepath);
    log('3. Check "model_literal" ~>', typeof model_literal === 'string');
  }


  /// STEP 5. Generate View file ///
  if (createTask.view) {

    log("\n");
    log("# Generate View file");

    // Generate View files

    let viewfiles = [
      'index',
      'show',
      'new',
      'edit',
      '_form',
      'components/item'
    ];

    function makeViewFile(file) {
      const view_filename = `${file}.ejs`;
      const view_filepath = path.join(rootpath, 'views', resource, view_filename);
      const view_literal = `<h2>${resource}/${view_filename}</h2>`;
      log(`>. Check "view_filepath" ~>`, `(${view_filename})`, view_filepath);
      makefile(view_filepath, view_literal, invoke_callback);
    }
    // for (let i in viewfiles) {
    //   console.log(viewfiles)
    //   makeViewFile(viewfiles[i])
    // }
    viewfiles.forEach(viewfile => {
      makeViewFile(viewfile);
    })
  }


  /// STEP 6. Generate Routes ///
  if (createTask.route) {
    log("\n");
    log("# Generate Routes");

    // Generate Routes

    function insertRouter(routerpath) {
      fs.readFile(routerpath, 'utf8', function(err, data) {

        let import_controller_literal = `const ${resource}_controller = require('../controllers/${resource}');`
        let route_literal = require(literals.router)(resource);

        data = data.replace("\n\n"+route_literal, '');
        data = data.replace(import_controller_literal, '');

        let splitByLine = data.split(/\n/);
        let import_index = splitByLine.indexOf('// Require controller modules');
        let index = splitByLine.indexOf('module.exports = router');
        
        if (import_index === -1) { import_index = -1 }
        if (index === -1) { index = splitByLine.length - 2 }

        splitByLine.splice(index, 0, '{{route_literal}}');
        splitByLine.splice(import_index + 1, 0, '{{import_controller}}');

        let newdata = splitByLine.join("\n");
        newdata = newdata.replace('{{import_controller}}', import_controller_literal);
        newdata = newdata.replace('{{route_literal}}', route_literal);
        log(">. literals\n", route_literal);

        makefile(routerpath, newdata, (err, inputs) => {
          invoke_callback(err, inputs);
          console.log("");
          next();
        });
      });
    }

    if (fs.existsSync(routerpath)) {
      insertRouter(routerpath);
    } else {
      fs.writeFile(routerpath, '', 'utf8', err => {
        insertRouter(routerpath);
      })
    }
  }
  else {
    next();
  }
  
}
