habitApp.controller('newHabitCtrl', function ($scope, habitService) {
    $scope.addNewHabit = function (habit) {
        habitService.postNewHabit(habit).then(function (res) {
            $scope.newHabit = '';
        });
        console.log(habit)
    }

	$scope.newHabit = {};

    $scope.newHabit.private = false;

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
