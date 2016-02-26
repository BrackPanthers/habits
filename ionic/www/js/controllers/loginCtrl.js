habitApp.controller('loginCtrl', function($scope, $state, $q, $ionicLoading, authSvc) {
  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

    // get current login status from fb connect plugin
    facebookConnectPlugin.getLoginStatus(function(success) {
      // if already logged in:
      if(success.status === 'connected'){ // if connnected:
        // console.log('getLoginStatus', success.status); // success is authResponse
        authSvc.facebookLogin(success.accessToken, success.userID);
        // then(function(response) {
        //  store token in localstorage
        //  go to user's profile page
        // }
        // $state.go('tabs.profile');
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
    authSvc.facebookLogin(response.authResponse.accessToken, response.authResponse.userID);

    $ionicLoading.hide();
    // $state.go('tabs.profile');
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // Used after login to get user's fb profile info. Only needs permission if getting special info, e.g. friends. REMOVE
  /*
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=id,email,name,first_name,last_name,picture&access_token=' + authResponse.accessToken, ["user_friends", "public_profile"],
      function (response) {
        console.log("fb connect response, line 20:", response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };
 */
});

/*
BASIC AUTH FLOW:

1. USER GOES TO LOGIN PAGE
2. APP CHECKS FOR VALID TOKEN AGAINST TOKENS STORED IN SERVER
3. IF TOKEN IS VALID, USER DATA IS PULLED AND USER IS REDIRECTED TO THEIR PROFILE PAGE
4. IF TOKEN IS INVALID/MISSING:
--> USER LOGS IN VIA FB/GOOGLE. CHECK TO SEE IF USER HAS ALREADY SIGNED UP FOR APP:
----> IF YES: GET USER DATA FROM DB AND INJECT INTO PROFILE VIEW/ ROUTE TO PROFILE VIEW
----> IF NO: GET USER DATA FROM FB GRAPH, ADD TO DB, INJECT INTO PROFILE VIEW, ROUTE TO PROFILE VIEW
--> TOKEN RETURNED FROM LOGIN IS STORED IN USER'S LOCAL STORAGE & POSTED TO SERVER

*/
