$(function() {
  $('.product-price').each(function () {
    var $this = $(this),
        $val = $this.text(),
        dec_pos = $val.indexOf('.');
    $this.html($val.substring(0, dec_pos) + '.<sup>' + $val.substring(dec_pos + 1) + '</sup>');
  });
});