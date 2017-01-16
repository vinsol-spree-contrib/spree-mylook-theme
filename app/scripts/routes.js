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

function renderSalesPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.sales({products: responseText['products'], images: responseText['images']});
};

function renderFreshArrivalPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.fresh_arrival({products: responseText['products'], images: responseText['images']});
};

function renderTemplate(){
  var path = window.location.pathname.split('/')[1]
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

  if(path == 'sales'){
    (new SpreeApi.productsList()).sendRequest({cb: renderSalesPage})
  }

  if(path == 'fresh_arrival'){
    (new SpreeApi.productsList()).sendRequest({cb: renderFreshArrivalPage})
  }
}

renderTemplate()