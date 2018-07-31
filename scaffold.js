let log = require('./test/test_console');
let fs = require('fs');
let path = require('path');
let cmd = require('node-cmd');

let scaffold = function(res) {

    /// STEP 1. Start: Load libraries and paths ///

    log("\n");
    log("# Start: Load libraries and paths");

    let makefile = require('./base/core/makefile');
    log('1. Check function load ~>', typeof makefile === 'function');

    const rootpath = process.env.PWD; // TODO: Need to change stable path wherever running command.
    const pkgpath = __dirname;
    let resource = res; // TODO: Need argument filter and normalizer (e.g. downcase, snakecase, pluralize)
    log('2. Check app project rootpath ~>', rootpath);
    log('3. Check pkg project rootpath ~>', pkgpath);
    log('4. Check argumented resource name ~>', resource);


    // validate resource
    if (!resource) {
      throw console.error("resource not defined (argv[2] : "+resource+")");
    }

    let invoke_callback = function(err, inputs) {
      console.log('invoke', inputs.path.replace(rootpath, '').replace(/\//, "\t\t"));
    }



    /// STEP 2. Generate Core Directory ///

    log("\n");
    log("# Generate Core directory");

    fs.stat(`${rootpath}/core`, function(err, stats) {
      if (err && (err.errno === 34 || err.errno === -2)) {
        log("<~(async) Making directory ...", `${rootpath}/core`);
        cmd.run(`cp -r ${pkgpath}/base/core ${rootpath}/core`);
      }
    });

    let routerpath = path.join(rootpath, 'routes', 'routes.js');
    let view_dirpath = path.join(rootpath, 'views');
    fs.access(routerpath, (err) => {
      if(err && (err.errno === -2 || err.errno === 34)) {
        makefile(routerpath, require('./base/literals/routes-file'), invoke_callback);
      };
    });
    fs.mkdir(view_dirpath, (err) => {
        log(err);
    });




    /// STEP 3. Generate Controller file ///

    log("\n");
    log("# Generate Controller file");

    // Generate Controller file

    const controller_filename = `${resource}.js`;
    const controller_filepath = path.join(rootpath, 'controllers', controller_filename);
    const controller_literal = require('./base/literals/controller')(resource);
    makefile(controller_filepath, controller_literal, invoke_callback);
    log('1. Check "controller_filename" ~>', controller_filename);
    log('2. Check "controller_filepath" ~>', controller_filepath);
    log('3. Check "controller_literal" ~>', typeof controller_literal === 'string');



    /// STEP 4. Generate Model file ///

    log("\n");
    log("# Generate Model file");

    // Generate Model file

    const model_filename = `${resource}.js`;
    const model_filepath = path.join(rootpath, 'models', model_filename);
    const model_literal = require('./base/literals/model')(resource);
    makefile(model_filepath, model_literal, invoke_callback);
    log('1. Check "model_filename" ~>', model_filename);
    log('2. Check "model_filepath" ~>', model_filepath);
    log('3. Check "model_literal" ~>', typeof model_literal === 'string');



    /// STEP 5. Generate View file ///

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
      const view_literal = '';
      log(`>. Check "view_filepath" ~>`, `(${view_filename})`, view_filepath);
      makefile(view_filepath, view_literal, invoke_callback);
    }
    for (let i in viewfiles) {
      makeViewFile(viewfiles[i])
    }



    /// STEP 6. Generate Routes ///

    log("\n");
    log("# Generate Routes");

    // Generate Routes

    fs.open(routerpath, 'r+', function(err, fd) {
      fs.readFile(routerpath, 'utf8', function(err, data) {

        let splitByLine = data.split(/\n/);
        let import_index = splitByLine.indexOf('// Require controller modules');
        let index = splitByLine.indexOf('module.exports = router');
        let route_literal = require('./base/literals/routes')(resource);

        if (import_index === -1) { import_index = -1 }
        if (index === -1) { index = splitByLine.length - 2 }

        splitByLine.splice(index, 0, '{{route_literal}}');
        splitByLine.splice(import_index + 1, 0, '{{import_controller}}');

        let newdata = splitByLine.join("\n");
        newdata = newdata.replace('{{import_controller}}', `const ${resource}_controller = require('../controllers/${resource}');`);
        newdata = newdata.replace('{{route_literal}}', route_literal);
        log(">. literals\n", route_literal);

        makefile(routerpath, newdata, invoke_callback);
        fs.close(fd, function() { /* console.log('Done') */ });
      });
    });

    log("");

}

module.exports = scaffold
