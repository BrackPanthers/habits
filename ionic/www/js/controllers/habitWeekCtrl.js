habitApp.controller('habitWeekCtrl', function($scope, $ionicModal, $ionicPopup, habitService) {

  function getWeeklyLogData() {
    /// CAN I GET "RELEVANT LOGS" FROM SERVER?
    // get data about today
    var today = moment();
    var dow = today.day();

    if (dow === 7) {
      dow = 0; // change day of week index for sunday
    }

    var today_date = today.format("MM-DD-YYYY");
    var startOfWeekDate = today.subtract(dow, 'd').startOf("day");

    // var sortedLogs = $scope.habitData.logs.sort(function(a, b) {
    //   if (moment(a) > moment(b)) {
    //     return 1;
    //   }
    //   if (moment(a) < moment(b)) {
    //     return -1;
    //   }
    //   return 0;
    // });

    var sortedLogs = $scope.habitData.logs;
    var relevantLogs = [];

    // loop through sorted logs, starting with most recent
    for (var i = sortedLogs.length - 1; i >= 0 ; i--) {
      var logMoment = moment(sortedLogs[i]);
      if (logMoment.isBefore(moment().endOf("day")) && logMoment.isAfter(startOfWeekDate)) {
        relevantLogs.push(logMoment.format("MM-DD-YYYY"));
      } else if (logMoment.isBefore(startOfWeekDate)) {
        break; // if you reach a log before the start of the week, stop loop
      }
    }

    // set up arr for keeping track of logged data
    var dayBoxArr = [
      {logged: false},
      {logged: false},
      {logged: false},
      {logged: false},
      {logged: false},
      {logged: false},
      {logged: false}
    ];

    // used to add class to today
    dayBoxArr[dow].today = true;

    dayBoxArr.forEach(function(elem, i, arr) {
      if (i === 0) {
        elem.date_stamp = startOfWeekDate.format("MM-DD-YYYY");
      } else {
        elem.date_stamp = startOfWeekDate.add(1, 'day').format("MM-DD-YYYY");
      }

      if (relevantLogs.indexOf(elem.date_stamp) > -1) {
        elem.logged = true;
      }
    });

    return dayBoxArr;
  }

  $scope.dayBoxArr = getWeeklyLogData();

  $scope.toggleDay = function(dayIndex, dayBoxArr, habitData) {
    var habitDay = dayBoxArr[dayIndex];
    var confirmPopup;
    // console.log(habitDay);

    // if trying to log habit in future, return and end function/ do nothing
    if (moment(habitDay.date_stamp) > moment()) {
      return;
    }

    if (habitDay.logged) {
      confirmPopup = $ionicPopup.confirm({
        title: 'Remove log for habit',
        template: 'Are you sure you want to remove all logs for this habit on ' + habitDay.date_stamp + '?',
        okText: 'Yes'
      })
      confirmPopup.then(
        function(res) {
          if (res) {
            console.log("remove habit logs");
            habitService.removeLog(habitData._id, habitDay.date_stamp);
            habitDay.logged = false;
          } else {
            console.log("do not remove habit logs");
          }
        }
      )
    } else {
      confirmPopup = $ionicPopup.confirm({
        title: 'Add log for habit',
        template: 'Are you sure you want to add a log for this habit on ' + habitDay.date_stamp + '?',
        okText: 'Yes'
      })
      confirmPopup.then(
        function(res) {
          if (res) {
            console.log("add habit log");
            habitDay.logged = true;
            habitService.logHabit(habitData._id, habitDay.date_stamp);
          } else {
            console.log("do not add habit log");
          }
        }
      )
    }

  };

  // modal functions
  $ionicModal.fromTemplateUrl('./views/habit-detail-modal.html', {
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

});
