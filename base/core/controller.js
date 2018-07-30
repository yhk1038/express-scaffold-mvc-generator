let fs = require('fs');
let path = require('path');

let [render, __] = require('./renderer');

class Controller {
  constructor(filename){
    this.controllers_name = this.constructor.name
    this.resource_name = path.basename(filename).replace(/\..+$/, '');
  }

  exports(__) {
    return __.klass = this;
  }
}

module.exports = [Controller, render, __]