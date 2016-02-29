
habitApp.controller('habitDetailCtrl', function($scope, $ionicActionSheet, habitDetailService, $timeout, $stateParams, habitService) {

  //TEST DATA//
    $scope.datesArr = [
      {
        num: 1,
        completed: true
      },
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1,
      completed: true},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1,
      completed: true},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1},
      {num: 1}
    ];
    var startDate = moment();
    var startDayOfWeek = startDate.format('d');
    var startDateNum = startDate.format('D');
    console.log(startDateNum);

    //SQUARE COLOR LOGIC//
    for (var i = 0; i < $scope.datesArr.length; i++) {
      if ( $scope.datesArr[i].completed === true) {
        $scope.datesArr[i]['class'] = 'green-highlight';
      }
    }
    console.log($scope.datesArr);


  //DEFINE START DATE//
  var startIndex;
  for (var i = 0; i < $scope.datesArr.length; i++) {
    if (i == startDayOfWeek) {
      $scope.datesArr[i].date = startDateNum;
      startIndex = i;
      console.log(startDateNum);
    }
  }

  //POPULATE CALENDAR DATES//
  for (var i = startIndex + 1; i < $scope.datesArr.length; i++) {
      $scope.datesArr[i]['date'] = moment().add(i - (startIndex), 'days').format('D');
  }

  var count = 1;
  for (var i = startIndex - 1; i >= 0; i--) {
    $scope.datesArr[i]['date'] = moment().subtract(count, 'days').format('D');
    count++;
  }


    // $scope.days = [
    //   {
    //     day: 'Sunday',
    //     letter: 'S',
    //     class: ''
    //   },
    //   {
    //     day: 'Monday',
    //     letter: 'M',
    //     class: ''
    //   },
    //   {
    //     day: 'Tuesday',
    //     letter: 'T',
    //     class: ''
    //   },
    //   {
    //     day: 'Wednesday',
    //     letter: 'W',
    //     class: ''
    //   },
    //   {
    //     day: 'Thursday',
    //     letter: 'T',
    //     class: ''
    //   },
    //   {
    //     day: 'Friday',
    //     letter: 'F',
    //     class: ''
    //   },
    //   {
    //     day: 'Saturday',
    //     letter: 'S',
    //     class: ''
    //   }
    // ]
    //
    // var currentDay = moment().format('dddd');
    // for (var i = 0; i < $scope.days.length; i++) {
    //   if ($scope.days[i].day === currentDay) {
    //     $scope.days[i].class = 'current-day';
    //   }
    // }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your habit',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 3000);

 };

 $scope.deleteHabit = function() {
   habitService.deleteHabit($stateParams.habitId);
 }

});
