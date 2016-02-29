habitApp.controller('loginCtrl', function($scope, authSvc) {

  $scope.facebookSignIn = authSvc.loginWithFb;

});
