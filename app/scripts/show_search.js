var ShowSearch = function(options) {
  this.searchOpenBtn = options.searchOpenBtn;
  this.search = options.search;
  this.searchInput = options.searchInput;
  this.searchCloseBtn = options.searchCloseBtn
  this.classToToggle = options.classToToggle;
};

ShowSearch.prototype.show = function() {
  var _this = this;
  $('body').on('click', _this.searchOpenBtn, function() {
    $(_this.search).addClass(_this.classToToggle);
    setTimeout(function() {
      $(_this.searchInput).focus();
    }, 400);
  });
};

ShowSearch.prototype.hide = function() {
  var _this = this;
  $('body').on('click', _this.searchCloseBtn, function() {
    setTimeout(function() {
      $('#search-input').val('');
      $('.search-results').html('').removeClass('show-search');
    }, 250);
    $(_this.search).removeClass(_this.classToToggle);
  });
};

ShowSearch.prototype.bindEvents = function() {
  this.show();
  this.hide();
};

$(window).on('load', function() {
  var options = {
    searchOpenBtn: '.main-search-btn',
    search: '.search-bar',
    searchInput: '#search-input',
    searchCloseBtn: '.close-search',
    classToToggle: 'drop'
  },

  showSearch = new ShowSearch(options);
  showSearch.bindEvents();
});
