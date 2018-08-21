let string_ = require('../helpers/string');

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
    
    if (__.klass.parse_format(req) === 'json') {
      render('json', req, res, __.${resource});  
    } else {
      render(\`\${__.klass.resource_name}/index\`, req, res, __);
    }
  }

  // GET /${resource}/1
  show(req, res) {
    
    if (__.klass.parse_format(req) === 'json') {
      render('json', req, res, __.${objname});
    } else {
      render(\`\${__.klass.resource_name}/show\`, req, res, __);
    } 
  }

  // POST /${resource}
  create(req, res) {

    if (__.klass.parse_format(req) === 'json') {
      redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}.json\`, req, res);
    } else {
      redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}\`, req, res);
    }
  }

  // POST /${resource}/1
  update(req, res) {

    if (__.klass.parse_format(req) === 'json') {
      redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}.json\`, req, res);
    } else {
      redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}\`, req, res);
    }
  }

  // POST /${resource}/1/delete
  delete(req, res) {
    
    if (__.klass.parse_format(req) === 'json') {
      redirect(\`/\${__.klass.resource_name}.json\`, req, res);
    } else {
      redirect(\`/\${__.klass.resource_name}\`, req, res);
    }
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