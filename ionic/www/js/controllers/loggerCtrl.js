habitApp.controller('loggerCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, habitService, authedUser) {

  $scope.userData = authedUser;

  console.log("The shizz nutz:", $scope.userData);

  $scope.logHabit = function(habitId) {
    console.log('habit logger ran!');
    habitService.logHabit(habitId);
    // update habit to show log/ remove from arr of ones to log
  };

  $scope.deleteHabit = function(habitId) {
    habitService.deleteHabit(habitId);
  }

  //TOGGLE CHECK BUTTON
  $scope.checked = false;
  $scope.toggleChecked = function() {
    $scope.checked = ! $scope.checked;
    $timeout(function() {
      $ionicSlideBoxDelegate.next()
    }, 600);
    $timeout(function() {
      $scope.checked = ! $scope.checked;
    }, 650);
  }

});
