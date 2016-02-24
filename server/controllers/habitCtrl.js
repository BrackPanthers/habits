var mongoose = require('mongoose'),
    Habit = require('./../models/Habit');

module.exports = {
  create: function(req, res) {
    var habit = new Habit(req.body);
    habit.save(function(err, result) {
      if (err) {
        res.status(500).send('failed to create habit');
      }
      res.send(result);
    });
  }
}
