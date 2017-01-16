import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'

function LoginModal(loginEmail, loginPassword) {
  (new SpreeApi.login()).sendRequest({params: {
    users: {
      email: loginEmail,
      password: loginPassword
    }
  }})
}

$(function() {
  var $login    = $('#loginSubmit'), 
      $loginEmail    = $('#loginEmail'), 
      $loginPassword = $('#loginPassword');

  $login.on('click', function() {
    LoginModal($loginEmail, $loginPassword);
  });

});
