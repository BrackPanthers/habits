habitApp.controller('streakInfoCtrl', function($scope) {
  var timeFrame = $scope.habitData.goal_point.time_frame;
  var logs = $scope.habitData.logs;

  var compareGoalTimeFrame = function(timeFrame) {
  	if (timeFrame === 'day') {
  		// console.log('run daily checkStreak')
  		checkStreak(logs); // longest streak
      currentDayStreak(logs); // current streak
  	}
  	else {
      var weekLogs = getLogDataByWeek(logs, $scope.habitData.created_at);
      $scope.longestWeekStreak = getLongestWeekStreak(weekLogs, $scope.habitData);
  	}
  }

  // checking daily current and highest streaks
  var checkStreak = function(logs) {
    // console.log('Starting check for Habit:', $scope.habitData.text);
    var highestStreak = 1;
    var streak = 1;
    // console.log('Length: ', logs.length);
    for (var i = 0; i < logs.length - 1; i++) {
		var date1 = moment(logs[i]).format("MM-DD-YYYY");
		var date2 = moment(logs[i + 1]).subtract(1, 'days').format("MM-DD-YYYY");
		// console.log("Comparing data", date1, date2)
		if ( date2 === date1 ) {
			// console.log("adding to streak")
			streak++;
  		if (streak > highestStreak) {
    			highestStreak = streak;
    			// console.log('set new highestStreak', highestStreak);
  		}
		}
      else {
        // console.log('streak ended');
        streak = 1;
      }
    }
    // console.log('fin', highestStreak);
    $scope.highestStreak = highestStreak;
  }

  var currentDayStreak = function(logs) {
    if (moment().subtract(1, 'days').startOf('day') > moment(logs[logs.length - 1])) {
      $scope.dayStreak = 0;
      return;
    } else {
      var dayStreak = 1;
    // console.log('Length: ', logs.length);
      for (var i = logs.length - 1; i > 0; i--) {
        var lastDay = moment(logs[i]).format("MM-DD-YYYY");
        var nextDay = moment(logs[i - 1]).add(1, 'days').format("MM-DD-YYYY");
        // console.log("Comparing data", lastDay, nextDay)
        if ( nextDay === lastDay) {
          dayStreak++;
        }
        else {
          break;
        }
      }
      $scope.dayStreak = dayStreak;
    }
  }

  /// WEEKLY STREAK FUNCTIONS ///

  var getLogDataByWeek = function(logData, habitStartDate) {
    var logDataByWeek = [];

    // get last elem in week data arr
    var lastElem;

    do {
      var weekObj = {logCount: 0};
      // if log data arr is empty, add initial obj w/ start date:
      if (logDataByWeek.length === 0) {
        weekObj.startDate = moment(habitStartDate).startOf('week');
        weekObj.endDate = weekObj.startDate.clone().add(7, 'days');
      } else { // else, add next obj incrementally
        weekObj.startDate = lastElem.startDate.clone().add(7, 'days'),
        weekObj.endDate = lastElem.endDate.clone().add(7, 'days')
      }

      // count each log that is within the range of each week obj
      logData.forEach(function(elem, i, arr) {
        if (moment(elem).isBetween(weekObj.startDate, weekObj.endDate)) {
          weekObj.logCount++;
        }
      });
      logDataByWeek.push(weekObj);
      console.log("WEEK", logDataByWeek);
      lastElem = logDataByWeek[logDataByWeek.length - 1];
    } while(!moment().isBetween(lastElem.startDate, lastElem.endDate));

    // console.log(logDataByWeek);
    return logDataByWeek;
  }

  var getLongestWeekStreak = function(logDataByWeek, habitData){
    if (habitData.goal_point.time_frame === 'day') {
      return null;
    }
    var longestStreak = 0;
    var currentStreak = 0;
    if (habitData.kind === 'more') {
      logDataByWeek.forEach(function(elem, i, arr) {
        if (elem.logCount >= habitData.goal_point.frequency) {
          currentStreak++;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      });
    } else if (habitData.kind === 'less') {
      logDataByWeek.forEach(function(elem, i, arr) {
        if (elem.logCount <= habitData.goal_point.frequency) {
          currentStreak++;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      });
    }
    return longestStreak;
  }

  // checkStreak(logs);
  compareGoalTimeFrame(timeFrame);

});
