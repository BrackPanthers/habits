habitApp.controller('profileCtrl', function($scope, $state, $stateParams, $ionicLoading, userSvc, authSvc, userData) {
  $scope.userData = userData; // this is after resolve is working
  $scope.authData = authSvc.getCurrUser();

  console.log("Data for profile page:", $scope.userData);
  console.log("Data for auth'd user:", $scope.authData);

  $scope.toggleContent = function(targetView) {
    if (targetView === 'mainContent') {
      $scope.showAccomps = false;
    } else if (targetView === 'accomps') {
      $scope.showAccomps = true;
    }
  }

  // this is an ionic component for a logout menu, if we want to use it later
  // $scope.showLogOutMenu = function() {
  //   var hideSheet = $ionicActionSheet.show({
  //     destructiveText: 'Logout',
  //     titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
  //     cancelText: 'Cancel',
  //     cancel: function() {},
  //     buttonClicked: function(index) {
  //       return true;
  //     },
  //     destructiveButtonClicked: function(){
  //       $ionicLoading.show({
  //         template: 'Logging out...'
  //       });
  //
  //       // Facebook logout
  //       facebookConnectPlugin.logout(function(){
  //         $ionicLoading.hide();
  //         $state.go('login');
  //       },
  //       function(fail){
  //         $ionicLoading.hide();
  //       });
  //     }
  //   });
  // };

  $scope.logoutUser = authSvc.logout;

  // }

  // dummy accomplishment data
  $scope.accompData = {
    longest_daily_streak: 27,
    goals_reached: 5,
    one_week_badges: 12,
    challenges_won: 7
  }


});
