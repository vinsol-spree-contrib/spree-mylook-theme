var ShowMenu = function(options) {
  this.menuOpenBtn = options.menuOpenBtn;
  this.menu = options.menu;
  this.menuCloseBtn = options.menuCloseBtn
  this.classToToggle = options.classToToggle;
};

ShowMenu.prototype.show = function() {
  var _this = this;
  $('body').on('click', _this.menuOpenBtn, function() {
    $(_this.menu).addClass(_this.classToToggle);
  });
};

ShowMenu.prototype.hide = function() {
  var _this = this;
  $('body').on('click', _this.menuCloseBtn, function() {
    $(_this.menu).removeClass(_this.classToToggle);  
  });
};

ShowMenu.prototype.bindEvents = function() {
  this.show();
  this.hide();
};

$(window).on('load', function() {
  var options = {
    menuOpenBtn: '.menu-toggle-btn',
    menu: '.menu-container',
    menuCloseBtn: '.close-menu',
    classToToggle: 'expand'
  },

  showMenu = new ShowMenu(options);
  showMenu.bindEvents();
});
