var mongoose = require('mongoose'),
    moment = require('moment'),
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
    console.log(req.body);
    var logDate;
    if (req.body.logDate) {

      logDate = moment(req.body.logDate).add(5, 'hours').toDate();
      if (moment(logDate) > moment()) {
        res.status(406).send('Cannot log in the future.');
      }
    } else {
      logDate = new Date();
    }

    Habit.findByIdAndUpdate(req.params.habitId, {$push: {logs: logDate}}, {new: true}, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        console.log(result);
        res.json(result);
      }
    })
  },

  removeLog: function(req, res) {
    var dateToRemove = req.body.date_to_remove;
    console.log('date to remove', dateToRemove);
    if (!dateToRemove) {
      res.status(406).send('Please include a habit ID and date with your request.');
    }
    var startOfDay = moment(dateToRemove).startOf('day').toDate();
    var endOfDay = moment(dateToRemove).endOf('day').toDate();

    Habit.findByIdAndUpdate(req.body.habit_id, {$pull: {logs: {$gte: startOfDay, $lte: endOfDay}}}, function(err, result) {
      if (err) {
        res.status(500).send('Could not complete removal of log');
      }

      res.send(result);
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
