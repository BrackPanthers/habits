angular.module('habitApp').service('googleAuth', function(){
    var setUser = function(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
    };
    var getUser = function() {
        return JSON
    };
    
    return {
        getUser: getUser,
        setUser: setUser
    }
})