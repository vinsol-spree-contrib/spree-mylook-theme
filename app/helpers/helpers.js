Handlebars.registerHelper('noop', function(options) {
  console.log(options)
  return '<div>22</div>';
});