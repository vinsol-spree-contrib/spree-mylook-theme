import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index';
import Handlebars from './../../.tmp/scripts/handlebars.runtime.js'
import Tea from './vendor/tea'
import getCookie from './cookie'

$(document).ready(function() {
  $('#wrapper').on('submit', '#sign-up', function(event) {
    (new SpreeApi.signUp()).sendRequest({params: {
      user: {
        email: $('#user-sign-up-name').val(),
        password: $('#user-sign-up-password').val()
      }
    }, cb: handleSuccess});
    event.preventDefault();
  });

  function handleSuccess(response) { 
    var message = 'Your account has been successfully created. Please Login to continue.';
    $('#flash').addClass('slide-down').html(message);
    $('#signup-modal, .modal-backdrop').removeClass('in');
    setTimeout(function() {
      $('#flash').removeClass('slide-down').html('');
    },5000);
  };
});

function eraseCookieFromAllPaths(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}

function deleteAllCookies() {
  eraseCookieFromAllPaths('auth_token');
  eraseCookieFromAllPaths('orderId');
  window.location.reload();
};

$(document).ready(function() {

  $('body').on('click', '#logout', function() {
    deleteAllCookies();
  });

  $('#wrapper').on('submit', '#login', function(event) {
    new SpreeApi.login().sendRequest({params: {
      user: {
        email: $('#user-login-name').val(),
        password: $('#user-login-password').val()
      }
    }, cb: handleLoginSuccess});
    event.preventDefault();
  });

  function handleLoginSuccess(response) {
    document.cookie = document.cookie + ";domain=" + window.location.origin + ";path=/"
    var cookie_auth_key = "auth_token=";
    if(document.cookie.indexOf(cookie_auth_key) > -1) {
      location.reload();
    }
  };
});
