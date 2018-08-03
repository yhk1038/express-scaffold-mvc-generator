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

    this.before_action('get_${objname}', ['show', 'edit', 'update', 'delete']);
  }
  
  // GET /${resource}.html
  // GET /${resource}.json
  index(req, res) {
    // 다음과 같이 double underscore 를 사용해,
    // 변수를 view 로 전송할 수 있습니다. (변수를 랜더링 스코프에서 유지시킵니다.)
    __.title = __.klass.controllers_name;
    
    // 다음과 같이 __.klass 를 통해 멤버 함수를 호출할 수 있습니다.
    // (__.klass 는 현재 class의 this를 가리키도록 되어있습니다.)
    // __.params = __.klass.${resource}_params(req);

    __.${resource} = ${name}.all();
    
    if (__.klass.parse_format(req) === 'json') {
      render('json', req, res, __.${resource});  
    } else {
      render(\`\${__.klass.resource_name}/index\`, req, res, __);
    }
  }
  
  // GET /${resource}/new.html
  new(req, res) {
    render(\`\${__.klass.resource_name}/new\`, req, res, __);
  }

  // GET /${resource}/1.html
  // GET /${resource}/1.json
  show(req, res) {
    
    if (__.klass.parse_format(req) === 'json') {
      render('json', req, res, __.${objname});
    } else {
      render(\`\${__.klass.resource_name}/show\`, req, res, __);
    } 
  }

  // POST /${resource}.html
  // POST /${resource}.json
  create(req, res) {
    redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}\`);
  }

  // GET /${resource}/1/edit.html
  edit(req, res) {
    render(\`\${__.klass.resource_name}/edit\`, req, res, __);
  }

  // POST /${resource}/1.html
  // POST /${resource}/1.json
  update(req, res) {
    redirect(\`/\${__.klass.resource_name}/\${__.${objname}.id}\`);
  }

  // POST /${resource}/1/delete.html
  // POST /${resource}/1/delete.json
  delete(req, res) {
    redirect(\`/\${__.klass.resource_name}\`);
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