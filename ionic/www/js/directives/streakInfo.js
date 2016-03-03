habitApp.directive('streakInfo', function() {
  return {
    templateUrl: './views/streakInfo.html',
    controller: 'streakInfoCtrl',
    scope: {
      habitData: '='
    }
  }
});