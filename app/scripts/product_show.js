import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'

function ShowProduct() {
  (new SpreeApi.productShow()).sendRequest({params:{ id: 1 }})
}
$(function() {
  ShowProduct();
});
