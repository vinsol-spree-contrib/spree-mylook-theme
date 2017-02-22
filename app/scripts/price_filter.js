$(function() {
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $( "#amountMin" ).val( "$" + ui.values[ 0 ] );
      $( "#amountMax" ).val( "$" + ui.values[ 1 ] );
    }
  });

  $("#amountMin").val("$" + $("#slider-range").slider("values", 0));
  $("#amountMax").val("$" + $("#slider-range").slider("values", 1));
});