habitApp.controller('tabsCtrl', function($scope, $state, authedUser) {
  authedUser.habits.map(function(item) {
    var today = moment();
    var last_log = moment(item.logs[item.logs.length-1]);
    item.checked = false;
    if (today.format("YYYY MM DD") === last_log.format("YYYY MM DD") && item.logs.length){
      item.checked = true;
    }
    return item;
  });

  $scope.authedUser = authedUser;

});
