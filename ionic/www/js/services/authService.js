habitApp.service('authSvc', function($http, $state, $q, Facebook, constants) {

  // used to hold data about current user. only id for now, null if no auth
  var currUser;

  // get's user data from token and sets currUser val
  this.setCurrUser = function() {
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
        currUser = response.data;
      },
      function(err) {
        console.log(err);
      }
    )
  };

  this.getCurrUser = function() {
    return currUser;
  };

  this.userIsAuthed = function() {
    if (currUser) {
      return $q.resolve(currUser); // resolve with curr user ID
    } else {
      return $q.reject();
    }
  };

  this.facebookLogin = function(accessToken, userId) {
    return $http({
      method: 'GET',
      url: constants.baseServerUrl + '/auth/facebook?fb_access_token=' + accessToken + '&user_id=' + userId
    })
    .then(
      function(response) {
        localStorage.setItem('app_token', response.data.token);
        currUser = response.data.user_id;
        console.log("CurrUser:", currUser);
        $state.go('tabs.profile', {userId: response.data.user_id});
        return response;
      },
      function(err) {
        console.log(err);
      }
    )
  };

  this.logout = function() {
    // delete token
    localStorage.removeItem('app_token');
    // logout on facebook (based on platform) & go back to login page
    if (ionic.Platform.isAndroid()) {
      facebookConnectPlugin.logout(
      function(){
        $ionicLoading.hide();
        $state.go('login');
      },
      function(fail){
        $ionicLoading.hide();
      });
    } else if (ionic.Platform.isIOS()) {
      Facebook.logout(function(response) {
        $state.go('login');
      })
    }
  };



})
