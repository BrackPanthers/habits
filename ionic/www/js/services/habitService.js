habitApp.service('habitService', function($http){
    this.getHabit = function() {
        return $http({
            method: 'GET',
            url: '/habits'
        }).then(function(response){
            return response.data
        })
    }
    this.postNewHabit = function(habit) {
        return $http({
            method: 'POST',
            url: '/habits',
            data: habit
        }).then(function(response){
            return response
        })
    }
    this.removeHabit = function(id) {
        return $http({
            method: 'DELETE',
            url: '/habits' + id
        }).then(function(response){
            return response.data
        })
    }
    this.changeData = function(data) {
        return $http({
            method: 'PuT',
            url: '/habits' + data._id,
            data: data
        }).then(function(response) {
            return response.data
        })
    }
})