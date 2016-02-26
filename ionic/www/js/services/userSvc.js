habitApp.service('userSvc', function($http, constants) {
  this.getUserData = function(userId) {
    return $http({
      method: 'GET',
      url: constants.baseServerUrl + '/user/' + userId
    })
    .then(
      function(response) {
        return response.data;
      },
      function(err) {
        console.log(err);
      }
    )
  }
})
