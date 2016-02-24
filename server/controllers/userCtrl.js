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
  }
}
