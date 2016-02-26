habitApp.service('authSvc', function($http) {
  this.facebookLogin = function(accessToken, userId) {
    console.log("access token:", accessToken, "user id:", userId);
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/auth/facebook?fb_access_token=' + accessToken + '&user_id=' + userId
    }).then(
      function(response) {
        console.log('response from success:', response);
        // localStorage.setItem('token', response.data);
      },
      function(err) {
        console.log(err);
      }
    )
  }
})
