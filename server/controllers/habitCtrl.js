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
  },

  log: function(req, res) {
    Habit.findByIdAndUpdate(req.params.habitId, {$addToSet: {logs: Date.now()}}, {new: true}, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    })
  },

  delete: function(req, res) {
    Habit.remove({_id: req.params.habitId}, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    })
  }

}
