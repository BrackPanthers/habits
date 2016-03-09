habitApp.controller('loggerCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, habitService) {

  $scope.userData = $scope.authedUser;

  $scope.slideChanged = function () {
      $ionicSlideBoxDelegate.update();
  }

  $scope.logHabit = function(habitId) {
    console.log('habit logger ran!');
    habitService.logHabit(habitId);
  };

  $scope.toggleNoButton = function(habit) {
    habit.no = true;
  }

  $scope.nextSlide = function() {
    $timeout(function() {
      $ionicSlideBoxDelegate.next();
    }, 500);
  }

  $scope.removeLog = function(habitId) {
    var dateToRemove = moment().format('MM-DD-YYYY');
    habitService.removeLog(habitId, dateToRemove);
  }

});
