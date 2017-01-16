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
});