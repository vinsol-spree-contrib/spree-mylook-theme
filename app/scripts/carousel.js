$(function() {
  // Activate Carousel
  $("#myCarousel").carousel();
  // Enable Carousel Controls
  $('.carousel-control').click(function(e){
    e.stopPropagation();
    var goTo = $(this).data('slide');
    if(goTo=="prev") {
        $('#carousel-id').carousel('prev'); 
    } else {
        $('#carousel-id').carousel('next'); 
    }
  });

  //Recenlty Viewed Carousel
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    margin: 10,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });
});