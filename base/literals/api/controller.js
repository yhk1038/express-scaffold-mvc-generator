let string_ = require('../../helpers/string');

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function literal(resource) {
  const name = string_.denormalizer(resource); // model class name
  const objname = string_.singularizer(resource); // model instance object name

  return `
let [Controller, renderer, __] = require('../core/controller');
let [render, redirect] = renderer.call;
let [Model, ${name}] = require('../models/${resource}');


class ${name}Controller extends Controller {
  constructor() {
    super(__filename);
    this.private('${resource}_params', 'get_${objname}');

    this.before_action('get_${objname}', ['show', 'update', 'delete']);
  }
  
  // GET /${resource}
  index(req, res) {
    __.${resource} = ${name}.all();
    
    render('json', req, res, __.${resource});
  }

  // GET /${resource}/1
  show(req, res) {
    
    render('json', req, res, __.${objname});
  }

  // POST /${resource}
  create(req, res) {

    redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}\`, req, res);
  }

  // POST /${resource}/1
  update(req, res) {

    redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}\`, req, res);
  }

  // POST /${resource}/1/delete
  delete(req, res) {
    
    redirect(\`/\${__.klass.resource_name}\`, req, res);
  }

  
  // @private
  get_${objname}(req, res, next) {
    __.${objname} = ${name}.find(req.params.id);
    next();
  }

  ${resource}_params(req) {
    return req.params
  }
}

let controller = new ${name}Controller();
module.exports = controller.exports(__);
`;
}

module.exports = literal