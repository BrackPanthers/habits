habitApp.controller('newHabitCtrl', function ($scope, habitService, authSvc) {
    $scope.addNewHabit = function (habit) {
    	habit.user_id = authSvc.getCurrUser().user_id;
        habitService.postNewHabit(habit).then(function (res) {
            $scope.newHabit = {
				goal_point: {} 
			};
        });
        // console.log(habit)
    }

	$scope.newHabit = {
		goal_point: {} 
	};

    $scope.newHabit.goal_point.frequency = 0;

    $scope.categories = [
	    'Exercise',
	    'Diet',
	    'Personal Growth',
	    'Relationships',
	    'Hygiene',
	    'General Health',
	    'Community',
	    'Technology',
	    'Sleep',
	    'Finances',
	    'Hobbies',
	    'Other'
  ]
    
});
