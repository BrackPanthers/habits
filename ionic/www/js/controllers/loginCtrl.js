habitApp.controller('loginCtrl', function($scope, authSvc, $ionicScrollDelegate) {

  $scope.facebookSignIn = authSvc.loginWithFb;
});
