let fs = require('fs');
let path = require('path');
let cmd = require('node-cmd');

// Helpers
let log = require('./base/helpers/envlog');
let makefile = require('./base/helpers/makefile');
let string_ = require('./base/helpers/string');

let delete_if_the_file_exists = require('./helpers/delete_if_the_file_exists');

module.exports = function(res, next, options) {
  // validate resource
  if (!res) {
    throw console.error("resource not defined. ("+res+")");
  }

  let literals = {
    router: './base/literals/routes'
  }

  if (options.api) {
    literals.router = './base/literals/api/routes'
  }

  log("\n");
  delete_if_the_file_exists(path.join('controllers', res+'.js'));
  delete_if_the_file_exists(path.join('models', res+'.js'));
  if (!options.api) {
    delete_if_the_file_exists(path.join('views', res));
  }
  
  let routerpath = path.join('routes', 'routes.js');
  fs.readFile(routerpath, 'utf8', (err, data) => {
    let import_controller_literal = `const ${res}_controller = require('../controllers/${res}');`;
    let route_literal = require(literals.router)(res);
    
    data = data.replace("\n\n"+route_literal, '');
    data = data.replace(import_controller_literal, '');

    makefile(routerpath, data, (err) => {
      if (err) { console.error(err) }
      else console.log(`deleted '${res}' from ${routerpath}`);
      console.log("");
      next();
    });
  });
}


