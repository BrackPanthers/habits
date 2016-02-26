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

    this.getHabit = function() {
        return $http({
            method: 'GET',
            url: '/api/habits'
        }).then(function(response){
            return response.data
        })
    }

    this.postNewHabit = function(habit) {
        return $http({
            method: 'POST',
            url: '/api/habits',
            data: habit
        }).then(function(response){
            return response
        })
    }

    this.removeHabit = function(id) {
        return $http({
            method: 'DELETE',
            url: '/api/habits' + id
        }).then(function(response){
            return response.data
        })
    }

    this.changeHabit = function(data) {
        return $http({
            method: 'PUT',
            url: '/api/habits' + data._id,
            data: data
        }).then(function(response) {
            return response.data
        })
    }
})
