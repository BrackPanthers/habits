habitApp.service('authSvc', function($http, $state, $q, $ionicLoading, Facebook, constants) {

  // used to hold data about current user. only id for now, empty to start
  var currUser = {};

  // used to return data on curr user;
  this.getCurrUser = function() {
    return currUser;
  };

  // check token auth from server endpoint
  this.checkAuth = function() {
    var def = $q.defer();
    var token = localStorage.getItem('app_token');

    // if no token, return false;
    if (!token) {
      def.reject();
    }

    // if token exists, check validity from server
    $http({
      method: 'GET',
      url: constants.baseServerUrl + '/auth',
      headers: {
        "Authorization": 'Token ' + token
      }
    })
    .then(
      function(response) {
        currUser.user_id = response.data; // update currUser data every time method called
        def.resolve(currUser); // if valid, resolve with user id
      },
      function(err) {
        def.reject(err); // if not, reject
      }
    );
    return def.promise;
  }

  // used to make sure auth'd users don't go to login page
  this.userNotAuthed = function() {
    var def = $q.defer();

    // if currUser obj has user id, block from login page/ redirect:
    if (currUser.user_id) {
      def.reject({message: 'currently logged in, no login page access allowed'});
      $state.go('tabs.profile', {userId: currUser.user_id});
    } else {
      this.checkAuth() // if not, check auth
      .then(
        function(response) { // if user authed, block/ redirect
          def.reject({message: 'currently logged in, no login page access allowed'});
          $state.go('tabs.profile', {userId: response});
        },
        function(err) {
          def.resolve(); // if neither, allow to login page
        }
      )
    }
    return def.promise;
  };

  // function that handles our internal auth after user has logged in w/ fb
  var serverFbAuth = function(accessToken, userId) {
    return $http({
      method: 'GET',
      url: constants.baseServerUrl + '/auth/facebook?fb_access_token=' + accessToken + '&user_id=' + userId
    })
    .then(
      function(response) { // response is a token from server, w/ user id
        localStorage.setItem('app_token', response.data.token);
        currUser.user_id = response.data.user_id;
        $state.go('tabs.profile', {userId: response.data.user_id});
        return response;
      },
      function(err) {
        console.log(err);
      }
    )
  };

  // full process of logging in with facebook. uses serverFbAuth fcn
  this.loginWithFb = function() {
    // if (platform === 'android'), i.e. we are on mobile:
    if (ionic.Platform.isAndroid()) {
      // get current fb login status from fb connect plugin
      facebookConnectPlugin.getLoginStatus(function(response) {
        // if already logged in to fb
        if(response.status === 'connected'){ // if connnected:
          // log in to app with fb data
          serverFbAuth(response.authResponse.accessToken, response.authResponse.userID);
        } else { // if not already logged into fb:
          // show ionicLoading dialogue
          $ionicLoading.show({
            template: 'Logging in...'
          });
          // log in to fb via app on phone
          facebookConnectPlugin.login(
            // asking for these permissions
            ['email', 'public_profile', 'user_friends'],
            // if success:
            function(response) {
              serverFbAuth(response.authResponse.accessToken, response.authResponse.userID)
              .then(function(response) {
                $ionicLoading.hide();
              })
            },
            // if failure:
            function(error) {
              console.log('Error loggin in with facebook', error);
              $ionicLoading.hide();
            }
          );
        }
      });
    } else if (ionic.Platform.isIOS()) { // ios === browser
      // check current fb login status in browser
      Facebook.getLoginStatus(function(response) {
        // if already connected, use authResponse data to log in to app
        if (response.status === 'connected') {
          serverFbAuth(response.authResponse.accessToken, response.authResponse.userID);
        } else { // if not, log in to fb first, then use authResponse to log in
          Facebook.login(function(response) {
            serverFbAuth(response.authResponse.accessToken, response.authResponse.userID);
          });
        }
      })
    }
  }

  this.logout = function() {
    // delete token
    localStorage.removeItem('app_token');
    // reset curr user data
    currUser = {};
    // go to login page
    $state.go('login');
    // *Note: logout does not log user out of fb, just our app
  };
})
