habitApp.controller('tabsCtrl', function($scope, authSvc) {
  $scope.currAuth = authSvc.getCurrUser();
});
