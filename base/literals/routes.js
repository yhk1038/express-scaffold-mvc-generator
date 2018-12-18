const string_ = require('../helpers/string');

function literal(resource) {
  return `
/// ${string_.denormalizer(resource)} ROUTES ///

router.get('/${resource}.:format?', ${resource}_controller.index);
router.get('/${resource}/new.:format?', ${resource}_controller.new);
router.get('/${resource}/:id.:format?', ${resource}_controller.show);
router.post('/${resource}.:format?', ${resource}_controller.create);
router.get('/${resource}/:id/edit.:format?', ${resource}_controller.edit);
router.post('/${resource}/:id.:format?', ${resource}_controller.update);
router.post('/${resource}/:id/delete.:format?', ${resource}_controller.delete);

`;
}

module.exports = literal