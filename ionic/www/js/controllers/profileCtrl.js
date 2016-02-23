habitApp.controller('profileCtrl', function($scope) {
  $scope.test = 'PROFILE CTRL CONNECTED';
  $scope.userData = {
    first_name: 'Mark',
    last_name: 'Zuckerberg',
    photo_url: 'http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzNjg3ODAzNDA0.jpg', // from facebook
    habits: [
      {
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
});
