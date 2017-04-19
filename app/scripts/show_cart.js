var ShowCart = function(options) {
  this.cartOpenBtn = options.cartOpenBtn;
  this.cart = options.cart;
  this.cartCloseBtn = options.cartCloseBtn
  this.classToToggle = options.classToToggle;
};

ShowCart.prototype.show = function() {
  var _this = this;
  $('body').on('click', _this.cartOpenBtn, function() {
    $(_this.cart).addClass(_this.classToToggle);
  });
};

ShowCart.prototype.hide = function() {
  var _this = this;
  $('body').on('click', _this.cartCloseBtn, function() {
    $(_this.cart).removeClass(_this.classToToggle);
  });
};

ShowCart.prototype.bindEvents = function() {
  this.show();
  this.hide();
};

$(function() {
  var options = {
    cartOpenBtn: '.cart-icon',
    cart: '.cart-container',
    cartCloseBtn: '.close-cart',
    classToToggle: 'expand'
  },

  showCart = new ShowCart(options);
  showCart.bindEvents();
});
