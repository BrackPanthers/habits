habitApp.controller('newHabitCtrl', function ($scope, $state, habitService, authSvc) {

  // blank habit obj
  $scope.newHabit = {
		goal_point: {}
	};

  $scope.addNewHabit = function (habit) {
  	habit.user_id = $scope.authedUser._id;
    habitService.postNewHabit(habit).then(function (res) {
      // reset habit obj
      $scope.newHabit = {
         goal_point: {}
	    };

      // once habit created, add to $scope.authedUser data to update view
      $scope.authedUser.habits.push(res.data);
      $state.go('tabs.profile', {userId: $scope.authedUser._id});
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
