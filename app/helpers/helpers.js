Handlebars.registerHelper('productUrl', function(id) {
  return '/product/' + id;
});

Handlebars.registerHelper('productImageUrl', function(image_ids, images) {
  return images.find(function(elem){return elem.id == image_ids[0]}).large_url;
});

Handlebars.registerHelper('productCategoryUrl', function(id) {
  return 'category_products/' + id
});