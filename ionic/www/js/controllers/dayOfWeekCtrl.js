habitApp.controller('dayOfWeekCtrl', function($scope) {

$scope.days = [
  {
    day: 'Sunday',
    letter: 'S',
    class: ''
  },
  {
    day: 'Monday',
    letter: 'M',
    class: ''
  },
  {
    day: 'Tuesday',
    letter: 'T',
    class: ''
  },
  {
    day: 'Wednesday',
    letter: 'W',
    class: ''
  },
  {
    day: 'Thursday',
    letter: 'T',
    class: ''
  },
  {
    day: 'Friday',
    letter: 'F',
    class: ''
  },
  {
    day: 'Saturday',
    letter: 'S',
    class: ''
  }
]

var currentDay = moment().format('dddd');
for (var i = 0; i < $scope.days.length; i++) {
  if ($scope.days[i].day === currentDay) {
    $scope.days[i].class = 'current-day';
  }
}
});
