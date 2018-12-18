/**
 * // If you want to make your own parent controller, use this:
 * 
 * const [BaseController, renderer, __] = require('express-scaffold-mvc-base').controller;
 * 
 * class Controller extends BaseController {
 *    // your own parent controller codes ...
 * }
 * 
 * module.exports = [Controller, renderer, __]
 */
module.exports = require('express-scaffold-mvc-base').controller;