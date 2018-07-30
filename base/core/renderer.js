function renderer(template, req, res, args) {
  res.render(template, args)
}
let __ = {};
module.exports = [ renderer, __ ]