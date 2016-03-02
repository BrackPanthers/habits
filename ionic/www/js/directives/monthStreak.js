habitApp.directive('calendarStreak', function() {
  return {
    templateUrl: './views/monthStreak.html',
    controller: 'monthStreakCtrl',
    scope: {
      habitData: '='
    }
  }
});
