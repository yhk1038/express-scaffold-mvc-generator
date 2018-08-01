let fs = require('fs');
let path = require('path');

let [render, __] = require('./renderer');

class Controller {
  constructor(filename){
    this.controllers_name = this.constructor.name
    this.resource_name = path.basename(filename).replace(/\..+$/, '');
  }

  before_action(){
    //
  }

  exports(__) {
    __.title = this.resource_name;
    __.klass = this;
    return this;
  }

  to_h() {
    return JSON.parse(JSON.stringify(this))
  }
}

module.exports = [Controller, render, __]