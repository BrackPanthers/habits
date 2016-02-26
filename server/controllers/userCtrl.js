var mongoose = require('mongoose'),
    User = require('./../models/User');

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
        res.send(response);
      }
    )
  }
}
