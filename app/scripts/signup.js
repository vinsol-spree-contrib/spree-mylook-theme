import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'

function SignupModal() {
  (new SpreeApi.signUp()).sendRequest({params: {
    users: {
      email: 'spree@vinsol.com',
      password: 'spree123'
    }
  }})
}
$(function() {
  var $signup = $('#signSubmit');
  $signup.on('click', function() {
    SignupModal();
  });
});
