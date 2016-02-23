// declaring this as variable for easy reuse throughout angular code
var habitApp = angular.module('habitApp', ['ionic']);

habitApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// tab based navigation/ routing
habitApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'loginCtrl'
  })
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: './views/tabnav.html'
  })
  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: './views/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('tabs.habitDetail', {
    url: '/habit/:habitId',
    views: {
      'profile-tab': {
        templateUrl: './views/habit-detail.html',
        controller: 'habitDetailCtrl'
      }
    }
  })
  .state('tabs.logger', {
    url: '/logger',
    views: {
      'logger-tab': {
        templateUrl: './views/logger.html',
        controller: 'loggerCtrl'
      }
    }
  })
  .state('tabs.newHabit', {
    url: '/newhabit',
    views: {
      'new-tab': {
        templateUrl: './views/new-habit.html',
        controller: 'newHabitCtrl'
      }
    }
  });


  $urlRouterProvider
  .otherwise('/tabs/profile');
});

habitApp.constant('constants', function() {
  return {
    baseServerUrl: 'http://localhost:3000'
  }
});

angular.module('habitApp').service('googleAuth', function(){
    var setUser = function(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
    };
    var getUser = function() {
        return JSON
    };
    
    return {
        getUser: getUser,
        setUser: setUser
    }
})
habitApp
    .service('loginService', function () {
        // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
        var setUser = function (user_data) {
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        };

        var getUser = function () {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

        return {
            getUser: getUser,
            setUser: setUser
        };
        var setNewUser = function (user_data) {
            window.localStorage.starter_google_user = JSON.stringify(user_data);
        };
        var getNewUser = function () {
            return JSON
        };

        return {
            getNewUser: getNewUser,
            setNewUser: setNewUser
        }




    });


angular.module('habitApp').controller('WelcomeCtrl', function($scope, $state, googleAuthService, $ionicLoading) {
  // This method is executed when the user press the "Sign in with Google" button
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login(
      {},
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
        googleAuthService.setUser({
          userID: user_data.userId,
          name: user_data.displayName,
          email: user_data.email,
          picture: user_data.imageUrl,
          accessToken: user_data.accessToken,
          idToken: user_data.idToken
        });

        $ionicLoading.hide();
        $state.go('app.home');
      },
      function (msg) {
        $ionicLoading.hide();
      }
    );
  };
})
habitApp.controller('habitDetailCtrl', function($scope) {
  $scope.test = 'HABIT DETAIL CTRL CONNECTED';
});

habitApp.controller('loggerCtrl', function($scope) {
  $scope.test = 'LOGGER CTRL CONNECTED';
});

habitApp.controller('loginCtrl', function($scope, $state, $q, loginService, $ionicLoading) {
  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      loginService.setUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('/profile');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = loginService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
						loginService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

						$state.go('/profile');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('/profile');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
});
habitApp.controller('newHabitCtrl', function($scope) {
  $scope.test = 'NEW HABIT CTRL CONNECTED';
});

habitApp.controller('profileCtrl', function($scope) {
  $scope.test = 'PROFILE CTRL CONNECTED';
  $scope.userData = {
    first_name: 'Mark',
    last_name: 'Zuckerberg',
    photo_url: 'http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzNjg3ODAzNDA0.jpg', // from facebook
    habits: [
      {
        kind: 'more',
        private: false,
        category: 'exercise',
        text: 'Go to gym',
        goal: {
          timeframe: 'week',
          frequency: 4
        },
        logs: ['2016-02-07', '2016-02-08', '2016-02-10', '2016-02-12', '2016-02-14', '2016-02-15', '2016-02-16', '2016-02-17', '2016-02-19', '2016-02-21']
      },
      {
        kind: 'less',
        private: false,
        category: 'diet',
        text: 'Eat red meat',
        goal: {
          timeframe: 'week',
          frequency: 2
        },
        logs: ['2016-02-07', '2016-02-10', '2016-02-17']
      }
    ]
  };
});
