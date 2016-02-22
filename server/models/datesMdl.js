var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datesSchema = new Schema({
  Users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  Habits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habits'
  }]
});

module.exports = mongoose.model('Dates', datesSchema);
