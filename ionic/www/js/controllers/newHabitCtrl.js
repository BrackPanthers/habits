habitApp.controller('newHabitCtrl', function ($scope, habitService, authSvc, authedUser) {

  // blank habit obj
  $scope.newHabit = {
		goal_point: {}
	};

  console.log("from new hab:", authedUser);

  $scope.addNewHabit = function (habit) {
  	habit.user_id = authedUser._id;
      habitService.postNewHabit(habit).then(function (res) {
        // reset habit obj
        $scope.newHabit = {
           goal_point: {}
  	    };
      });
  }

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
