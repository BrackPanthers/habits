var mongoose = require('mongoose');

var dateSchema = mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  habits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habits'
  }]
});

module.exports = mongoose.model('Date', dateSchema);
