habitApp.controller('loggerCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, habitService, dataSvc) {

  // $scope.userData = $scope.authedUser;

  $scope.slideChanged = function () {
      $ionicSlideBoxDelegate.update();
  }

  // doesn't pass log date, logs right now
  $scope.logHabit = function(habitData) {

    habitService.logHabit(habitData._id)
    .then(
      function(res) {
        console.log('habit logger ran!');
        // update local data
        habitData.logs.push(new Date());
        habitData.checked = true;
        dataSvc.setLoggedForToday(habitData.dayBoxArr, true);
      }
    )

  };

  $scope.toggleNoButton = function(habit) {
    habit.no = true;
  }

  $scope.nextSlide = function() {
    $timeout(function() {
      $ionicSlideBoxDelegate.next();
    }, 500);
  }

  // removes log for today
  $scope.removeLog = function(habitData) {
    var dateToRemove = moment().format('MM-DD-YYYY');
    var habitId = habitData._id;

    habitService.removeLog(habitId, dateToRemove)
    .then(
      function(res) {
        console.log("log removed for", dateToRemove);
        dataSvc.removeLocalLogsForDay(habitData.logs, dateToRemove);
        dataSvc.setLoggedForToday(habitData.dayBoxArr, false);
        habitData.checked = false;
      }
    )
  }

});
