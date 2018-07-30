function literal(resource) {
  return `
let Model = require('../core/model');

class ${resource} extends Model {
  constructor(){
    super()
  }
}

module.exports = [ Model, ${resource} ]
  `
}

module.exports = literal