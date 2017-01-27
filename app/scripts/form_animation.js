$(function () {
  $("input.input_field").blur(function() {
    $(this).parent().addClass('input_filled');
  });
});
