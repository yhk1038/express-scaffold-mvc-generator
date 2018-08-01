/**
 * // If you want to make your own parent controller, use this:
 * 
 * let [BaseController, render, __] = require('express-scaffold-mvc-base').controller;
 * class Controller extends BaseController {
 *    // your own parent controller codes ...
 * }
 * 
 * module.exports = [Controller, render, __]
 */
module.exports = require('express-scaffold-mvc-base').controller;