var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./UserMdl.js')

var achievementsSchema = new Schema({
  Finished: {
    enum: []
  },
  Consecutive: {
    enum: []
  },
  Dates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dates'
  }],
  Habit: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habits'
  }]
})

module.exports = mongoose.model('Achievements', achievementsSchema);
