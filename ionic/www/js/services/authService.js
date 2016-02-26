habitApp.service('authSvc', function($http, $state, constants) {
  this.facebookLogin = function(accessToken, userId) {
    return $http({
      method: 'GET',
      url: constants.baseServerUrl + '/auth/facebook?fb_access_token=' + accessToken + '&user_id=' + userId
    })
    .then(
      function(response) {
        localStorage.setItem('app_token', response.data.token);
        console.log(response.data.user_id);
        $state.go('tabs.profile', {userId: response.data.user_id});
        return response;
      },
      function(err) {
        console.log(err);
      }
    )
  };

  this.getCurrAuth = function() {
    var token = localStorage.getItem('app_token');
    return $http({
      method: 'GET',
      url: constants.baseServerUrl + '/auth',
      headers: {
        "Authorization": 'Token ' + token
      }
    })
    .then(
      function(response) {
        console.log(response.data);
      },
      function(err) {
        console.log(err);
      }
    )
  }
})
