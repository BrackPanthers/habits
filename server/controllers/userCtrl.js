var mongoose = require('mongoose'),
    User = require('./../models/User'),
    moment = require ('moment');

module.exports = {
  create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err, result) {
      if (err) {
        res.status(500).send('failed to create user');
      }
      res.send(result);
    });
  },
  map: function(req, res) {
    var userId = req.params.userId;
    User.findOne({_id: userId})
    .populate('habits')
    .exec(
      function(err, response) {
        if (err) {
          res.status(500).send('server error when finding user');
        } else if (!response) {
          res.status(401).send('no user found with that id');
        }
        response.habits.forEach(function(item) {
          item.logs.sort(function(a, b) {
            if (moment(a) > moment(b)) {
              return 1;
            }
            if (moment(a) < moment(b)) {
              return -1;
            }
            return 0;
          });
        })
        res.send(response);
      }
    )
  }
}
