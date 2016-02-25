habitApp.controller('loggerCtrl', function($scope, $ionicSlideBoxDelegate, habitSvc) {

  $scope.myHabits = [
    {
      _id: '324546576879',
      user_id: 'exrctvyubnimo',
      text: "meditate",
      kind: "more"
    },
    {
      _id: '345678909080',
      user_id: 'exrctvyubnimo',
      text: "exercise",
      kind: "more"
    },
    {
      _id: '5673547949',
      user_id: 'exrctvyubnimo',
      text: "call mom",
      kind: "more"
    },
    {
      _id: '43512452546',
      user_id: 'exrctvyubnimo',
      text: "eat read meat",
      kind: "more"
    }
  ];

  $ionicSlideBoxDelegate.update();

  $scope.logHabit = function(habitId) {
    habitSvc.logHabit(habitId);
    // update habit to show log/ remove from arr of ones to log
  };

  //
  // $scope.getHabitsForUser = function(userId) {
  //   habitSvc.getHabitsForUser(userId);
  // }
  //
  // $scope.getHabitsForUser($stateParams.userId)
  // .then(
  //   function(response) {
  //     $scope.myHabits = response; // or response.data
  //   }
  // );

});
