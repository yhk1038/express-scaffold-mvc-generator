function extract_memberVariables(args) {
  let mem = {},
      keys = Object.keys(args);
  
  for (var i in keys) {
    var key = keys[i];
    if (key != 'contentFor' && key != '_locals') {
      mem[key] = args[key]
    }
  }
  console.log(mem);
  return mem
}

function renderer(template, req, res, args) {
  res.render(template, extract_memberVariables(args))
}
let __ = {};
module.exports = [ renderer, __ ]