let pluralize = require('pluralize');

String.prototype.to_capitalize = function () {
  return this.trim().split('')
    .map((char, i) => i === 0 ? char.toUpperCase() : char)
    .reduce((final, char) => final += char, '')
}
String.prototype.to_camelcase = function () {
  return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}
String.prototype.to_snakecase = function () {
  return this.replace(/[A-Z]/g, function (char, i){
    return i === 0 ? char.toLowerCase() : '_'+char.toLowerCase()
  })
}

module.exports.normalizer = function normalizer(str) {
  return pluralize.plural(str.trim().to_snakecase()).replace(' ', '_').replace('__', '_')
}
module.exports.denormalizer = function denormalizer(str) {
  return pluralize.singular(str.trim())
    .replace('_', ' ').split(' ').map((char, i) => {
      return char.split('').map((c, j) => j === 0 ? c.toUpperCase() : c).join('')
    }).join('');
}
module.exports.singularizer = function singularizer(str) {
  return pluralize.singular(normalizer(str));
}