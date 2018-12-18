/**
 * // If you want to make your own parent model, use this:
 * 
 * const BaseModel = require('express-scaffold-mvc-base').model;
 * 
 * class Model extends BaseModel {
 *   constructor(){
 *   }
 * }
 * 
 * module.exports = Model
 */
module.exports = require('express-scaffold-mvc-base').model;