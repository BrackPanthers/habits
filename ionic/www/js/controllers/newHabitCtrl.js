habitApp.controller('newHabitCtrl', function ($scope, habitService) {
    $scope.addNewHabit = function (habit) {
        habitService.postNewHabit(habit).then(function (res) {
            $scope.newHabit = '';
        });
        console.log(habit)
    }

	$scope.newHabit = {};

    $scope.newHabit.more = false;

    $scope.newHabit.less = false;

    $scope.newHabit.dayFrequency = false;

    $scope.newHabit.weekFrequency = false;

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

  //   $scope.getHabitCategory = function() {
  //   	habitService.getHabit().then(function (response) {
		// 	$scope.category = response;
		// })
  //   };

  //   $scope.getHabitCategory();
    
});
