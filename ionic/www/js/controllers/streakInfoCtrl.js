habitApp.controller('streakInfoCtrl', function($scope, $ionicActionSheet, $timeout, $stateParams, habitService, $ionicHistory) {
  var timeFrame = $scope.habitData.goal_point.time_frame;
  var logs = $scope.habitData.logs;

  var compareGoalTimeFrame = function(timeFrame) {
  	if (timeFrame === 'day') {
  		console.log('run daily checkStreak')
  		checkStreak(logs);
  	}
  	else {
  		console.log('run weekly checkStreak')
  		weekHighestStreak(logs);
  	}
  }

  var checkStreak = function(logs) {
    console.log('Starting check for Habit:', $scope.habitData.text);
    var highestStreak = 1;
    var streak = 1;
    console.log('Length: ', logs.length);
    for (var i = 0; i < logs.length - 1; i++) {
		var date1 = moment(logs[i]).format("MM-DD-YYYY");
		var date2 = moment(logs[i + 1]).subtract(1, 'days').format("MM-DD-YYYY");
		// console.log("Comparing data", date1, date2)
		if ( date2 === date1 ) {
			console.log("adding to streak")
			streak++; 
        		if (streak > highestStreak) {
          			highestStreak = streak;
          			console.log('set new highestStreak', highestStreak);
        		}
		}
      else {
        console.log('streak ended');
        streak = 1;
      }
    }
    console.log('fin', highestStreak);
    $scope.highestStreak = highestStreak;
  }

  var weekHighestStreak = function(logs) {
  	console.log('Starting check for Habit:', $scope.habitData.text);
  	var weekStreak = 1;
  	var highestWeek = 1;
  	console.log('Length: ', logs.length);
  	for(var i = 0; i < logs.length - 1; i++) {
  		var week1 = moment(logs[i]).format("MM-DD-YYYY");
  		var week2 = moment(logs[i + 1]).subtract(1, 'week').format('MM-DD-YYYY');
  		console.log("Comparing data", week1, week2)
  		if (week2 === week1) {
  			console.log("adding to streak")
  			weekStreak++;
  				if (weekStreak > highestWeek) {
  					highestWeek = weekStreak;
  				}
  		}
  		else {
  			console.log('streak ended');
  			weekStreak = 1;
  		}
  	}
  	console.log('fin', highestWeek);
  	$scope.highestWeek = highestWeek;
  }




  // checkStreak(logs);
  compareGoalTimeFrame(timeFrame);

});