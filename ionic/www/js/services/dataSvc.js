// 0 dependency (except for moment) service for common functions to sort, map, etc.

habitApp.service('dataSvc', function() {

  this.checkForLogsToday = function(habitsArr) {
    habitsArr.map(function(item) {
      var today = moment();
      var last_log = moment(item.logs[item.logs.length-1]);
      item.checked = false;
      if (today.format("YYYY MM DD") === last_log.format("YYYY MM DD") && item.logs.length){
        item.checked = true;
      }
      return item;
    })
  };

  this.sortLogs = function(logsArr) {
    logsArr.sort(function(a, b) {
      if (moment(a) > moment(b)) {
        return 1;
      }
      if (moment(a) < moment(b)) {
        return -1;
      }
      return 0;
    })
  };

  this.removeLocalLogsForDay = function(logsArr, dateToRemove) {
    var startOfDay = moment(dateToRemove).startOf('day');
    var endOfDay = moment(dateToRemove).endOf('day');

    for (var i = logsArr.length - 1; i >= 0; i--) {
      if (moment(logsArr[i]).add(1, 'm').isBetween(startOfDay, endOfDay)) {
        logsArr.splice(i, 1);
      }
    }
  }
});
