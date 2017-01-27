import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'

function getProfile() {
  // Remove modal logic
  $('#LoginModal').modal('hide');
  alert('login Success');
  (new SpreeApi.profile()).sendRequest({})
}

function LoginModal(loginEmail, loginPassword) {
  (new SpreeApi.login()).sendRequest({params: {
    users: {
      email: loginEmail,
      password: loginPassword
    }
  }, cb: getProfile});
}

$(function() {
  var $login         = $('#loginSubmit'),
      $loginEmail    = $('#loginEmail'), 
      $loginPassword = $('#loginPassword');

  $('#loginSubmit').on('click', function() {
    LoginModal($loginEmail, $loginPassword);
  });

});