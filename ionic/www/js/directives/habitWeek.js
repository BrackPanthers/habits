habitApp.directive('habitWeek', function() {
  return {
    templateUrl: './../../views/habit-week.html',
    controller: 'habitWeekCtrl',
    scope: {
      habitData: '='
    }
  }
});
