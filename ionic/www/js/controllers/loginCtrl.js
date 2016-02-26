habitApp.controller('loginCtrl', function($scope, $state, $q, $ionicLoading, authSvc) {
  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

    // get current login status from fb connect plugin
    facebookConnectPlugin.getLoginStatus(function(success) {
      // if already logged in:
      if(success.status === 'connected'){ // if connnected:
        authSvc.facebookLogin(success.authResponse.accessToken, success.authResponse.userID);
        // .then(function(response) {
        //   $state.go('tabs.profile', {userId: response.});
        // })
      } else { // if not connected, start login/connection process:
        $ionicLoading.show({
          template: 'Logging in...'
        });

        facebookConnectPlugin.login(['email', 'public_profile', 'user_friends'], fbLoginSuccess, fbLoginError);
      }
    });
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

  $scope.getCurrAuth = function() {
    authSvc.getCurrAuth();
  }
});
