habitApp.controller('loggerCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, habitService, authedUser) {

  $scope.userData = authedUser;
  $scope.userHabits = authedUser.habits.map(function(item) {
    var today = moment();
    var last_log = moment(item.logs[item.logs.length-1]);
    item.checked = false;
    if (today.format("YYYY MM DD") === last_log.format("YYYY MM DD") && item.logs.length){
      item.checked = true;
    }
    console.log(item.checked);
    return item;
  });

  console.log("user habits", $scope.userHabits);

  console.log("The shizz nutz:", $scope.userData);

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

  $scope.deleteHabit = function(habitId) {
    habitService.deleteHabit(habitId);
  }

});
