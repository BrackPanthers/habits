habitApp.controller('monthStreakCtrl', function($scope, $ionicActionSheet, $timeout, $stateParams, habitService, $ionicHistory) {
    console.log("Habit detail data:", $scope.habitData);

    //DEFINE STARTING DATE, CURRENT DATE, AND DIFFERENCE IN DAYS
    var start = moment($scope.habitData.logs[0]);
    var now = moment();
    var difference = now.diff(start, 'days');
    //CHECK IF DIFFERENCE IS LESS THAN 7 AND SET TO 7 IF IT IS
    difference = difference >= 7 ? difference : 7;

    //MAKE DATES ARRAY OF OBJECTS BASED OFF DIFFERENCE (# OF DAYS ELAPSED)
    $scope.datesArr = [];
    for (var i = 0; i < difference; i++) {
      $scope.datesArr.push({});
    }

    //ESTABLISH START DAY OF WEEK (0-6) AND DAY OF MONTH(1-31)
    var startDayOfWeek = start.format('d');
    var startDayOfMonth = start.format('D');

    //LOOP THROUGH DATES ARRAY AND DEFINE STARTING INDEX
    var startIndex;
    for (var i = 0; i < $scope.datesArr.length; i++) {
      if (i == startDayOfWeek) {
        $scope.datesArr[i].date = startDayOfMonth;
        startIndex = i;
      }
    }

    //POPULATE CALENDAR SQUARES BEGINNING WITH START INDEX (MOVING FORWARD)
    for (var i = startIndex; i < $scope.datesArr.length; i++) {
        $scope.datesArr[i]['date'] = moment(start).add(i - (startIndex), 'days').format('D');
    }
    //POPULATE CALENDAR SQUARES BEGINNING WITH START INDEX (MOVING BACKWARDS)//
    var count = 1;
    for (var i = startIndex - 1; i >= 0; i--) {
      $scope.datesArr[i]['date'] = moment(start).subtract(count, 'days').format('D');
      $scope.datesArr[i]['period'] = 'before-start';
      count++;
    }

    //COMPLETED SQUARES COLOR LOGIC
    $scope.habitData.logs.forEach(function(item) {
      for (var i = 0; i < $scope.datesArr.length; i++) {
        if ($scope.datesArr[i].date == moment(item).format('D')) {
          $scope.datesArr[i].class = 'green-highlight';
        }
      }
    })

    // //SQUARES BEFORE START DATE
    // for (var i = 0; i < $scope.datesArr.length; i++) {
    //   if ($scope.datesArr[i].date < )
    // }


  // //SQUARE COLOR LOGIC//
  // for (var i = 0; i < $scope.datesArr.length; i++) {
  //   if ( $scope.datesArr[i].completed === true) {
  //     $scope.datesArr[i]['class'] = 'green-highlight';
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
