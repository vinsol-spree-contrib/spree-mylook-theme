import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'
function renderIndexPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.index({products: responseText['products'], images: responseText['images']});
};

function renderMenPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.men({products: responseText['products'], images: responseText['images']});
};

function renderWomenPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.women({products: responseText['products'], images: responseText['images']});
};

function renderKidsPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.women({products: responseText['products'], images: responseText['images']});
};

function renderSalesPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.sales({products: responseText['products'], images: responseText['images']});
};

function renderFreshArrivalPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.fresh_arrival({products: responseText['products'], images: responseText['images']});
};

function renderCategoryPage(responseText) {
  document.querySelector('#wrapper').innerHTML = MyApp.html.categories({categories: responseText['taxonomies']});
};

function renderCategoryProductsPage(responseText) {
  document.querySelector('#wrapper').innerHTML = MyApp.html.category_products({products: responseText['products']});
};

function renderProductShowPage(responseText) {
  document.querySelector('#wrapper').innerHTML = MyApp.html.show({product: responseText.product, productProperties: responseText.product_properties, images: responseText['images']});
};

function renderTemplate() {
  var path = window.location.pathname.split('/')[1],
      id = window.location.pathname.split('/')[2],
      category_id = window.location.pathname.split('/')[2];
  if(path == ''){
    // (new SpreeApi.productsList()).sendRequest({cb: renderIndexPage})
    (new SpreeApi.productsList()).sendRequest({params:{ per_page: 4}})
  }

  if(path == 'men'){
    (new SpreeApi.productsList()).sendRequest({params:{ per_page: 4, page: 1}, cb: renderMenPage})
  }

  if(path == 'women'){
    (new SpreeApi.productsList()).sendRequest({cb: renderWomenPage})
  }

  if(path == 'kids'){
    (new SpreeApi.productsList()).sendRequest({cb: renderKidsPage})
  }

  if(path == 'sales'){
    (new SpreeApi.productsList()).sendRequest({cb: renderSalesPage})
  }

  if(path == 'fresh_arrival'){
    (new SpreeApi.productsList()).sendRequest({cb: renderFreshArrivalPage})
  }
  // if(path == 'product_show'){
  //   (new SpreeApi.productShow()).sendRequest({params:{ id: productShow}, cb: renderShowPage})
  // }
  switch(path) {
    case 'categories' : (new SpreeApi.taxonomyList()).sendRequest({cb: renderCategoryPage});
    break;
    case 'product' : (new SpreeApi.productShow()).sendRequest({cb: renderProductShowPage, params: { id: id }});
    break;
    case 'category_products' : (new SpreeApi.productsList()).sendRequest({cb: renderCategoryProductsPage, params: { q: { taxons_taxonomy_id_eq: category_id }}});
    break;
    default : (new SpreeApi.productsList()).sendRequest({cb: renderIndexPage});
  }
}

renderTemplate()
