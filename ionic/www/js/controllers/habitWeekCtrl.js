habitApp.controller('habitWeekCtrl', function($scope) {
  $scope.test = 'HABIT WEEK CTRL CONNECT';

  $scope.dayBoxArr = [false, false, false, false, false, false, false];
  $scope.toggleDay = function(dayIndex) {
    $scope.dayBoxArr[dayIndex] = !$scope.dayBoxArr[dayIndex];
  };
});
