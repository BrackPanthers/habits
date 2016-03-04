habitApp.service("streakSvc", function() {
  /// DAILY STREAK FUNCTIONS ///

  // checking daily current and highest streaks
  this.checkStreak = function(logs) {
    var highestStreak = 1;
    var streak = 1;
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
    return highestStreak;
  }

  this.currentDayStreak = function(logs) {
    if (moment().subtract(1, 'days').startOf('day') > moment(logs[logs.length - 1])) {
      var dayStreak = 0;
    } else {
      var dayStreak = 1;
      for (var i = logs.length - 1; i > 0; i--) {
        var lastDay = moment(logs[i]).format("MM-DD-YYYY");
        var nextDay = moment(logs[i - 1]).add(1, 'days').format("MM-DD-YYYY");
        if ( nextDay === lastDay) {
          dayStreak++;
        }
        else {
          break;
        }
      }
    }

    return dayStreak;
  }

  /// WEEKLY STREAK FUNCTIONS ///
  this.getLogDataByWeek = function(logData, habitStartDate) {
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
      lastElem = logDataByWeek[logDataByWeek.length - 1];
    } while(!moment().isBetween(lastElem.startDate, lastElem.endDate));

    // console.log(logDataByWeek);
    return logDataByWeek;
  }

  this.getLongestWeekStreak = function(logDataByWeek, habitData){
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

  this.getCurrentWeekStreak = function(logDataByWeek, habitData) {
    var currWeekStreak = 0;
    var currWeekElem = logDataByWeek[logDataByWeek.length - 1];
    var lastWeekElem = logDataByWeek[logDataByWeek.length - 2];
    var goalFreq = habitData.goal_point.frequency;

    if (habitData.kind === 'more') {

      // if habit has only been active for a week, check if this week has met goal
      if (!lastWeekElem) {
        if (currWeekElem.logCount < goalFreq) {
          return currWeekStreak;
        } else if (currWeekElem.logCount >= goalFreq) {
          return 1; // if this week has been met, return streak of 1
        }
      }

      // if this and last week did not meet goal, return currWeekStreak of 0
      if (currWeekElem.logCount < goalFreq && lastWeekElem.logCount < goalFreq) {
        return currWeekStreak; // equal to 0 at this time
      } else { // if not, loop through and find longest current weekly streak
        // if current week has already met goal, add to count.
        if (currWeekElem.logCount >= goalFreq) {
          currWeekStreak++;
        }
        // loop through remaining elements, starting with prevous week
        for (var i = logDataByWeek.length - 2; i >= 0; i--) {
          if (logDataByWeek[i].logCount >= goalFreq) {
            currWeekStreak++;
          } else {
            break;
          }
        }
      }
    } else if (habitData.kind === 'less') {

      // if habit has only been active for a week, check if this week has met goal
      if (!lastWeekElem) {
        if (currWeekElem.logCount > goalFreq) {
          return currWeekStreak;
        } else if (currWeekElem.logCount <= goalFreq) {
          return 1; // if this week has been met, return streak of 1
        }
      }

      // if this and last week did not meet goal, return currWeekStreak of 0
      if (currWeekElem.logCount > goalFreq && lastWeekElem.logCount > goalFreq) {
        return currWeekStreak; // equal to 0 at this time
      } else { // if not, loop through and find longest current weekly streak
        // if current week has already met goal, add to count.
        if (currWeekElem.logCount <= goalFreq) {
          currWeekStreak++;
        }
        // loop through remaining elements, starting with prevous week
        for (var i = logDataByWeek.length - 2; i >= 0; i--) {
          if (logDataByWeek[i].logCount <= goalFreq) {
            currWeekStreak++;
          } else {
            break;
          }
        }
      }
    }

    return currWeekStreak;
  }
});
