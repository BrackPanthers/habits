habitApp.controller('loggerCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, habitService, authSvc, userSvc) {
  $scope.test = 'LOGGER CTRL CONNECTED';

  // $scope.myHabits = [
  //   {
  //     _id: '324546576879',
  //     user_id: 'exrctvyubnimo',
  //     text: "meditate",
  //     kind: "more"
  //   },
  //   {
  //     _id: '345678909080',
  //     user_id: 'exrctvyubnimo',
  //     text: "exercise",
  //     kind: "more"
  //   },
  //   {
  //     _id: '5673547949',
  //     user_id: 'exrctvyubnimo',
  //     text: "call mom",
  //     kind: "more"
  //   },
  //   {
  //     _id: '43512452546',
  //     user_id: 'exrctvyubnimo',
  //     text: "eat read meat",
  //     kind: "more"
  //   }
  // ];

  $scope.logHabit = function(habitId) {
    console.log('habit logger ran!');
    habitService.logHabit(habitId);
    // update habit to show log/ remove from arr of ones to log
  };

  $scope.deleteHabit = function(habitId) {
    habitService.deleteHabit(habitId);
  }

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

  $scope.currUserId = '56d478f37f056e5303d39d4f';
  console.log($scope.currUserId);

  userSvc.getUserData($scope.currUserId).then(function(result) {
    $scope.myHabits = result.habits;
    $ionicSlideBoxDelegate.update();
    console.log(result);
  })

  //TOGGLE CHECK BUTTON
  $scope.checked = false;
  $scope.toggleChecked = function() {
    $scope.checked = ! $scope.checked;
    $timeout(function() {
      $ionicSlideBoxDelegate.next()
    }, 600);
    $timeout(function() {
      $scope.checked = ! $scope.checked;
    }, 650);
  }

});
