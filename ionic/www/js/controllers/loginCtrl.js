habitApp.controller('loginCtrl', function ($scope, $state, $q, loginService, $ionicLoading, $location) {
    $scope.loginGoogle = function () {
        console.log('logging in');
        var ref = window.open($scope.serverIp + '/auth/google');
        ref.addEventListener('loadstart', function (event) {
            if ((event.url).startsWith("http://localhost:3006/auth/google/callback")) {
                var requestToken = (event.url).split("code=")[1];
                alert("Thanks for logging in");
                ref.close();
                $state.go('Success', {});
            }
        });
    }
    $scope.loginFacebook = function () {
        console.log('logging in');
        var ref = window.open('http://google.com');
        ref.addEventListener('loadstart', function (event) {
            if ((event.url).startsWith("http://localhost:3006/auth/google/callback")) {
                var requestToken = (event.url).split("code=")[1];
                alert("Thanks for logging in");
                ref.close();
                $state.go('Success', {});
            }
        });
    }




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