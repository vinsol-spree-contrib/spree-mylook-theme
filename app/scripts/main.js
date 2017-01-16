import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'
function renderIndexPage(responseText){
  document.querySelector('#wrapper').innerHTML = MyApp.html.index({products: responseText['products'], images: responseText['images']});
};

function renderTemplate(){
  var path = window.location.pathname.split('/')[1]
  if(path == ''){
    (new SpreeApi.productsList()).sendRequest({cb: renderIndexPage})
  }
}

renderTemplate()