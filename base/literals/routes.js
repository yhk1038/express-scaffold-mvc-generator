function literal(resource) {
  return `
/// ${resource.toUpperCase()} ROUTES ///

router.get('/${resource}', ${resource}_controller.index);
router.get('/${resource}/new', ${resource}_controller.new);
router.get('/${resource}/:id', ${resource}_controller.show);
router.post('/${resource}', ${resource}_controller.create);
router.get('/${resource}/:id/edit', ${resource}_controller.edit);
router.post('/${resource}/:id', ${resource}_controller.update);
router.post('/${resource}/:id/delete', ${resource}_controller.delete);

`;
}

module.exports = literal