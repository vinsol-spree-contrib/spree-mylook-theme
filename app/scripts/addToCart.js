import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index';
import { getCookie, setCookie } from './cookie';

function showOrder(responseText) {
}

function addToCart() {
  (new SpreeApi.updateOrder()).sendRequest({cb: showOrder, 'params': { 'id': getCookie('orderId'), 'line_items_attributes': [ { 'quantity': 1, 'variant_id': $('[data-variant-id]:first').data('variant-id') } ]}});
};

$(window).on('load', function() {
	$('.add-to-cart').on('click', function() {
		addToCart();
	});
});
