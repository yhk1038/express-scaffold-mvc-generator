const string_ = require('../helpers/string');

function literal(resource) {
  const name = string_.denormalizer(resource);
  return `const Model = require('../core/model');

class ${name} extends Model {
  constructor(){
    super()
  }
}

module.exports = [ Model, ${name} ]
`
}

module.exports = literal