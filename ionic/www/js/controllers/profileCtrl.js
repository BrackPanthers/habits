habitApp.controller('profileCtrl', function($scope, $state, $ionicLoading) {
  $scope.test = 'PROFILE CTRL CONNECTED';

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

  $scope.logoutUser = function() {
    facebookConnectPlugin.logout(
    function(){
      $ionicLoading.hide();
      $state.go('login');
    },
    function(fail){
      $ionicLoading.hide();
    });
  }


  // dummy data. remove when connected to back end
  $scope.userData = {
    first_name: 'Mark',
    last_name: 'Zuckerberg',
    photo_url: 'http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzNjg3ODAzNDA0.jpg', // from facebook
    habits: [
      {
        _id: 12345,
        kind: 'more',
        private: false,
        category: 'exercise',
        text: 'Go to gym',
        goal: {
          timeframe: 'week',
          frequency: 4
        },
        logs: ['2016-02-07', '2016-02-08', '2016-02-10', '2016-02-12', '2016-02-14', '2016-02-15', '2016-02-16', '2016-02-17', '2016-02-19', '2016-02-21']
      },
      {
        _id: 12346,
        kind: 'less',
        private: false,
        category: 'diet',
        text: 'Eat red meat',
        goal: {
          timeframe: 'week',
          frequency: 2
        },
        logs: ['2016-02-07', '2016-02-10', '2016-02-17']
      },
      {
        _id: 12345,
        kind: 'more',
        private: false,
        category: 'exercise',
        text: 'Go to gym',
        goal: {
          timeframe: 'week',
          frequency: 4
        },
        logs: ['2016-02-07', '2016-02-08', '2016-02-10', '2016-02-12', '2016-02-14', '2016-02-15', '2016-02-16', '2016-02-17', '2016-02-19', '2016-02-21']
      },
      {
        _id: 12346,
        kind: 'less',
        private: false,
        category: 'diet',
        text: 'Eat red meat',
        goal: {
          timeframe: 'week',
          frequency: 2
        },
        logs: ['2016-02-07', '2016-02-10', '2016-02-17']
      }
    ]
  };

  // accomplishment data
  $scope.accompData = {
    longest_daily_streak: 27,
    goals_reached: 5,
    one_week_badges: 12,
    challenges_won: 7
  }


});
