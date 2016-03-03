habitApp.controller('profileCtrl', function($scope, authSvc, profileData) {
  $scope.profileData = profileData; // this is after resolve is working
  console.log(profileData);


  $scope.toggleContent = function(targetView) {
    if (targetView === 'mainContent') {
      $scope.showAccomps = false;
    } else if (targetView === 'accomps') {
      $scope.showAccomps = true;
    }
  }

  // var logs = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]

  // var checkStreak = function(logs) {
  //   console.log('Starting check');
  //   var highestStreak = 0;
  //   var streak = 0;
  //   console.log('Length: ', logs.length);
  //   for (var i = 0; i < logs.length - 1; i++) {
  //     if (logs[i + 1] - logs[i] === 1) {
  //       streak++; 
  //       if (streak > highestStreak) {
  //         highestStreak = streak;
  //         console.log('set new highestStreak', highestStreak);
  //       }
  //       console.log('add to streak: '+streak+'/'+highestStreak);
  //     }
  //     else {
  //       console.log('streak ended');
  //       streak = 0;
  //     }
  //   }
  //   console.log('fin', highestStreak);
  //   $scope.highestStreak = highestStreak;
  // }

  // checkStreak(logs);

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
