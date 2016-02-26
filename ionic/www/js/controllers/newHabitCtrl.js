habitApp.controller('newHabitCtrl', function($scope, habitService) {
  $scope.addNewHabit = function(habit) {
      habitService.postNewHabit(habit).then(function(res){
          $scope.newHabitData = "";
      })
  }
});
