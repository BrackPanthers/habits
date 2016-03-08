habitApp.service('habitService', function($http, constants, $state) {

  this.logHabit = function(habitId, logDate) {
    var reqBody = {};
    // if specific log date, include in body
    if (logDate) {
      reqBody.logDate = logDate;
    }
    return $http({
      method: 'PUT',
      url: constants.baseServerUrl +'/loghabit/' + habitId,
      data: reqBody
    })
    .then(
      function(response) {
        console.log('habit log successful');
        return response.data;
      },
      function(err) {
        console.log(err);
      }
    );
  };

  this.removeLog = function(habitId, dateToRemove) {
    var reqBody = {
      date_to_remove: dateToRemove,
      habit_id: habitId
    };

    console.log(reqBody);

    return $http({
      method: 'PUT',
      url: constants.baseServerUrl + '/removelog',
      data: reqBody
    })
    .then(
      function(response) {
        return response.data;
      },
      function(err) {
        console.log(err);
      }
    )
  }

  this.deleteHabit = function(habitData) {
    return $http.delete(constants.baseServerUrl +'/deletehabit/' + habitData._id)
      .then(function(result) {
        console.log('Habit has been deleted.');
        return result;
        // $state.go($state.current, {userId: habitData.user_id}, {refresh: true});
    });
  }

  this.getHabit = function() {
    return $http({
      method: 'GET',
      url: constants.baseServerUrl + '/api/habits',
    }).then(function(response){
      console.log(response.data)
      return response.data;
    })
  }

  this.postNewHabit = function(habit) {
    return $http({
        method: 'POST',
        url: constants.baseServerUrl +'/api/habits',
        data: habit
    }).then(function(response){
        console.log(response)
        return response;
    })
  }

  this.changeHabit = function(data) {
    return $http({
        method: 'PUT',
        url: constants.baseServerUrl +'/api/habits' + data._id,
        data: data
    }).then(function(response) {
        return response.data;
    })
  }
})
