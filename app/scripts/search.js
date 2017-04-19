import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index';

function showSearchResults(responseText) {
	var products = responseText['products'];
	for(var i=0; i<products.length;i++) {
		var product = products[i]
		$('.search-results').append(
			'<a class="search-item" href="/product/' + product.id + '">' + product.name + '</a>'
		)
	}
};

function searchProducts() {
  $('#wrapper').on('input', '#search-input', function() {
  	$('.search-results').html('');
  	$('.search-results').removeClass('show-search');
  	if($(this).val().length){
  		$('.search-results').addClass('show-search');
        new SpreeApi.productsList().sendRequest({cb: showSearchResults, params: { per_page: 5, q: { name_cont: $(this).val() }}});
		}
  });
};

$(function() {
  searchProducts();
});
