habitApp.controller('loginCtrl', function($scope, $state, $q, $ionicLoading, authSvc, Facebook, constants) {

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    // if (platform === 'android') {
    if (ionic.Platform.isAndroid()) {
      // get current login status from fb connect plugin
      facebookConnectPlugin.getLoginStatus(function(response) {
        // if already logged in:
        if(response.status === 'connected'){ // if connnected:
          authSvc.facebookLogin(response.authResponse.accessToken, response.authResponse.userID);
        } else { // if not connected, start login/connection process:
          $ionicLoading.show({
            template: 'Logging in...'
          });

          facebookConnectPlugin.login(['email', 'public_profile', 'user_friends'], fbLoginSuccess, fbLoginError);
        }
      });
    } else if (ionic.Platform.isIOS()) { // ios === browser
      // use
      Facebook.login(function(response) {

        authSvc.facebookLogin(response.authResponse.accessToken, response.authResponse.userID);
      });
    }
  };

  // callback to run after login is successful
  var fbLoginSuccess = function(response) {
    // is this if block necessary?
    if (!response.authResponse) {
      fbLoginError("Cannot find the authResponse");
      return;
    }

    authSvc.facebookLogin(response.authResponse.accessToken, response.authResponse.userID)
    .then(function(response) {
      $ionicLoading.hide();
    })
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

});
