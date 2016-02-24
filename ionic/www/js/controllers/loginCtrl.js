habitApp.controller('loginCtrl', function($scope, $state, $q, loginService, $ionicLoading, $ionicModal, $timeout, ngFB, $location) {


$scope.fbLogin = function () {
    ngFB.login({scope: 'email, public_profile'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                // $scope.closeLogin();
                $location.path( "/tabs/profile" );
            } else {
                alert('Facebook login failed');
                $location.path( "/login" );
            }
        });
};

});