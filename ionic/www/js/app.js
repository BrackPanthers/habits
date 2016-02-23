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
