// import { SpreeApi } from './../../bower_components/spree-frontend-integration/lib/index'

// function SignupModal() {
//   (new SpreeApi.signUp()).sendRequest({params: {
//     users: {
//       email: 'spree@vinsol.com',
//       password: 'spree123'
//     }
//   }})
// }
// $(function() {
//   var $signup = $('#signSubmit');
//   $signup.on('click', function() {
//     SignupModal();
//   });
// });

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