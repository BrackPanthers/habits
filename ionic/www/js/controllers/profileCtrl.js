habitApp.controller('profileCtrl', function($scope, authSvc, profileData) {
  $scope.profileData = profileData; // this is after resolve is working
  // console.log(profileData);

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

  // dummy accomplishment data
  $scope.accompData = {
    longest_daily_streak: 27,
    goals_reached: 5,
    one_week_badges: 12,
    challenges_won: 7
  }

  $scope.habitTab = true;
  $scope.badgesTab = false;
  $scope.toggleHabitTab = function() {
    $scope.habitTab = true;
    $scope.badgesTab = false;
  }
  $scope.toggleBadgesTab = function() {
    $scope.habitTab = false;
    $scope.badgesTab = true;
  }



});
