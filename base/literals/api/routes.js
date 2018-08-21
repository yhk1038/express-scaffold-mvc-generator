let string_ = require('../../helpers/string');

function literal(resource) {
  return `
/// ${string_.denormalizer(resource)} ROUTES ///

router.get('/${resource}', ${resource}_controller.index);
router.get('/${resource}/:id', ${resource}_controller.show);
router.post('/${resource}', ${resource}_controller.create);
router.post('/${resource}/:id', ${resource}_controller.update);
router.post('/${resource}/:id/delete', ${resource}_controller.delete);

`;
}

module.exports = literal