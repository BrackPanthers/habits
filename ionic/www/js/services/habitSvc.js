habitApp.service('habitService', function($http, constants) {

  this.logHabit = function(habitId) {
    $http.put(constants.baseServerUrl +'/loghabit/' + habitId).then(function(result) {
      console.log(result);
    })
  }

  this.deleteHabit = function(habitId) {
    $http.delete(constants.baseServerUrl +'/deletehabit/' + habitId)
      .then(function(result) {
        console.log('habit delete function test');
    })
  }

    this.getHabit = function() {
        return $http({
            method: 'GET',
            url: constants.baseServerUrl + '/api/habits'
        }).then(function(response){
            console.log(response.data)
            return response.data
            
        })
    }

    this.postNewHabit = function(habit) {
        
        return $http({
            method: 'POST',
            url: constants.baseServerUrl +'/api/habits',
            data: habit
        }).then(function(response){
            console.log(response)
            return response
            
        })
    }

   

    this.changeHabit = function(data) {
        return $http({
            method: 'PUT',
            url: constants.baseServerUrl +'/api/habits' + data._id,
            data: data
        }).then(function(response) {
            return response.data
        })
    }
})
