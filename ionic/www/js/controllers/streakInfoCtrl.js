habitApp.controller('streakInfoCtrl', function($scope, streakSvc) {

  var compareGoalTimeFrame = function(logs, timeFrame) {
  	if (timeFrame === 'day') {
  		// console.log('run daily checkStreak')
  		$scope.highestStreak = streakSvc.checkStreak(logs, $scope.habitData); // longest streak
      $scope.dayStreak = streakSvc.currentDayStreak(logs);
      // currentDayStreak(logs); // current streak
  	}
  	else if (timeFrame === 'week'){
      var weekLogs = streakSvc.getLogDataByWeek(logs, $scope.habitData.created_at);
      $scope.currWeekStreak = streakSvc.getCurrentWeekStreak(weekLogs, $scope.habitData);
      $scope.longestWeekStreak = streakSvc.getLongestWeekStreak(weekLogs, $scope.habitData);
  	}
  }

  // get streaks
  compareGoalTimeFrame($scope.habitData.logs, $scope.habitData.goal_point.time_frame);

});
