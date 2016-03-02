var mongoose = require('mongoose'),
    Habit = require('./../models/Habit'),
    User = require('./../models/User');

module.exports = {

  create: function(req, res) {
    var habit = new Habit(req.body);
    habit.save(function(err, result) {
      if (err) {
        res.status(500).send('failed to create habit');
      }
      User.findByIdAndUpdate(result.user_id, {$addToSet: {habits: result._id}}, {new: true}, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
          console.log(result);
        }
      });
    });
  },

  log: function(req, res) {
    console.log("I am making a log!");
    Habit.findByIdAndUpdate(req.params.habitId, {$push: {logs: new Date()}}, {new: true}, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        console.log(result);
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
  },
    read: function (req, res) {

        Habit.find()
            .exec()

            .then(function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.send(result)
                }
            })
    },
    update: function (req, res) {
        Habit.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result)
            }
        })
    }
}
