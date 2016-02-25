
habitApp.service('habitService', function($http) {

  this.logHabit = function(habitId) {
    $http.put('/loghabit/' + habitId).then(function(result) {
      console.log(result);
    })
  }

  this.deleteHabit = function(habitId) {
    $http.delete('/deletehabit/' + habitId)
      .then(function(result) {
        console.log('habit delete function test');
    })
  }


})
