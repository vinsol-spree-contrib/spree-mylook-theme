$(window).on('load', function() {

  $('body').on('click', '.product-property-heading', function() {
    $(this).next('.product-property').slideToggle(200);
  });

  $('body').on('click', '.continue-shopping', function() {
    $('.cart-container').removeClass('expand');
    $('html, body').animate({scrollTop: $('.category-section').offset().top - 40}, 500);
  });

  $('body').on('click', '.scroll-top', function() {
    $('html,body').animate({scrollTop: 0}, 500);
  });

  $('body').on('click', '.show-code', function() {
    $('.coupon-form').slideToggle(200);
  });

  $('body').on('click', '.single-order-detail .panel-heading', function() {
    $(this).closest('.single-order-detail').toggleClass('active');
    $(this).closest('.single-order-detail').siblings('.single-order-detail').removeClass('active');
  });

});

$(window).on('load scroll', function() {
  if($(this).scrollTop() > 74) {
    $('body').addClass('header-up');
  }
  else {
    $('body').removeClass('header-up');
  }

  if($(this).scrollTop() > 200) {
    $('.scroll-top').addClass('slide-up');
  }
  else {
    $('.scroll-top').removeClass('slide-up');
  }
});
