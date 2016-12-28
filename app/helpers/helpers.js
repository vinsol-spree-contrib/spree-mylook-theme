Handlebars.registerHelper('productImageUrl', function(image_ids, images) {
  return images.find(function(elem){return elem.id == image_ids[0]}).large_url;
});