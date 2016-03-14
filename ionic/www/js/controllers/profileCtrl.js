habitApp.controller('profileCtrl', function($scope, authSvc, $ionicPopup) {
  $scope.profileData = $scope.authedUser; // this comes from parent scope
  // console.log("profile", $scope.profileData.habits);

  $scope.toggleContent = function(targetView) {
    if (targetView === 'mainContent') {
      $scope.showAccomps = false;
    } else if (targetView === 'accomps') {
      $scope.showAccomps = true;
    }
  }

  $scope.changeName = function() {
    $scope.objCheck.name = 'BILLY';
  }

  $scope.logoutUser = authSvc.logout;

  // dummy accomplishment data
  $scope.accompData = {
    longest_daily_streak: 27,
    goals_reached: 5,
    one_week_badges: 12,
    challenges_won: 7
  }

});
