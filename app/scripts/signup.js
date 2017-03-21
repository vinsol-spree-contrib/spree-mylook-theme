import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index';
import Handlebars from './../../.tmp/scripts/handlebars.runtime.js'
import Tea from './vendor/tea'
import getCookie from './cookie'// import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'


$(document).ready(function() {
  $('#wrapper').on('submit', '#sign-up', function(event) {
    (new SpreeApi.signUp()).sendRequest({params: {
      user: {
        email: $('#user_id').val(),
        password: $('#user_pwd').val()
      }
    }, cb: handleSuccess});
    event.preventDefault();
  });

  function handleSuccess(response) {
    var message = 'Your account has been successfully created. Please Login to continue.';
    $('#flash').html(message);
  };
});

// Handlebars.registerHelper('currentOrder', function(fn) {
//   localStorage.setItem('order', 'response')
//   (new SpreeApi.currentOrder()).sendRequest({cb: test})
//   function test(response){
//     localStorage.setItem('order', response)
//   }
// });

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
    setTimeout(function() {
      $('#flash').removeClass('slide-down').html('');
    },10000);
  };
});

function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
  }
};

$(document).ready(function() {

  $('body').on('click', '#logout', function() {
    deleteAllCookies();
    location.reload();
  });

  $('#wrapper').on('submit', '#login', function(event) {
    (new SpreeApi.login()).sendRequest({params: {
      user: {
        email: $('#user-login-name').val(),
        password: $('#user-login-password').val()
      }
    }, cb: handleLoginSuccess});
    event.preventDefault();
  });

  function handleLoginSuccess(response) {
    var message = 'You have been successfully logged in.';
    location.reload();
  };
});