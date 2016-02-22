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
habitApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'loginCtrl'
  })
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: './../views/tabnav.html'
  })
  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: './../views/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('tabs.habitDetail', {
    url: '/habit/:habitId',
    views: {
      'profile-tab': {
        templateUrl: './../views/habit-detail.html',
        controller: 'habitDetailCtrl'
      }
    }
  })
  .state('tabs.logger', {
    url: '/logger',
    views: {
      'logger-tab': {
        templateUrl: './../views/logger.html',
        controller: 'loggerCtrl'
      }
    }
  })
  .state('tabs.newHabit', {
    url: '/newhabit',
    views: {
      'new-tab': {
        templateUrl: './../views/new-habit.html',
        controller: 'newHabitCtrl'
      }
    }
  });


  $urlRouterProvider
  .otherwise('/tabs/profile');
});


habitApp.controller('habitDetailCtrl', function($scope) {
  $scope.test = 'HABIT DETAIL CTRL CONNECTED';
});

habitApp.controller('loggerCtrl', function($scope) {
  $scope.test = 'LOGGER CTRL CONNECTED';
});

habitApp.controller('loginCtrl', function($scope) {

});

habitApp.controller('newHabitCtrl', function($scope) {
  $scope.test = 'NEW HABIT CTRL CONNECTED';
});

habitApp.controller('profileCtrl', function($scope) {
  $scope.test = 'PROFILE CTRL CONNECTED';
});

habitApp.constant('constants', function() {
  return {
    baseServerUrl: 'http://localhost:3000'
  }
});

habitApp
.service('loginService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
