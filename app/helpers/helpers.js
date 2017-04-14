Handlebars.registerHelper('productUrl', function(id) {
  return '/product/' + id;
});

Handlebars.registerHelper('productImageUrl', function(image_ids, images) {
  return images.find(function(element) { return element.id == image_ids[0] }).large_url;
});

Handlebars.registerHelper('productCategoryUrl', function(id) {
  return 'category_products/' + id;
});

Handlebars.registerHelper('isLoggedIn', function(options) {
  var cookie_auth_key = "auth_token=";

  if(document.cookie.indexOf(cookie_auth_key) > -1) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('isOrderComplete', function(completedAt, options) {
  if(completedAt != null) {
    return options.fn(this);
  }
});

Handlebars.registerHelper('isParent', function(id, options) {
  if(id == null) {
    return options.fn(this);
  }
});

Handlebars.registerHelper('isChild', function(categories, taxonomy_id, options) {
  var child = categories.map(function(elem, i){
    if(elem.taxonomy_id == taxonomy_id){
      return elem;
    }
  });
  childs = child.filter(function(element){ return element != undefined });
  return options.fn(childs);
});

Handlebars.registerHelper('firstItem', function(index, className) {
  return index == 0 ? className : '';
});

Handlebars.registerHelper('formatDate', function(date) {
  return new Date(date).toDateString();
});

Handlebars.registerHelper('showAddress', function(address_id, address, options) {
  var _address = address.find(function(element){return element.id == address_id});
  return options.fn(_address);
});

Handlebars.registerHelper('showShipping', function(shipment_ids, shipments, shipping_rates, options) {
  var _shipment = shipments.find(function(element){return element.id == shipment_ids[0]});
  var _shipmentNumber = _shipment.selected_shipping_rate_id;
  var _rate = shipping_rates.find(function(element){return element.id == _shipmentNumber});
  return options.fn(_rate);
});

Handlebars.registerHelper('showPayment', function(payment_ids, payments, payment_methods, options) {
  var _payment = payments.find(function(element){return element.id == payment_ids[0]});
  var _paymentNumber = _payment.payment_method_id;
  var _method = payment_methods.find(function(element){return element.id == _paymentNumber});
  return options.fn(_method);
});

Handlebars.registerHelper('showVariants', function(line_item_id, line_items, variants, images, options) {
  var _lineItem = line_items.find(function(element) { return element.id == line_item_id });
  var _variantId = _lineItem.variant_id;
  var _variant = variants.find(function(element){return element.id == _variantId});
  var _imageId = _variant.image_ids[0];
  var _image = images.find(function(element){return element.id == _imageId});
  var itemsHash = { 'line_item': _lineItem, 'variant': _variant, 'image': _image };
  return options.fn(itemsHash);
});

Handlebars.registerHelper('showProductVariants', function(variant_id, variants, images, options) {
  var _variant = variants.find(function(element) { return element.id == variant_id});
  var _imageId = _variant.image_ids[0];
  var _image = images.find(function(element){return element.id == _imageId});
  var itemsHash = { 'variant': _variant, 'image': _image };
  return options.fn(itemsHash);
});
