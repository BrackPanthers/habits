var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  FaceBook: {
    type: String
  },
  Google: {
    type: String
  },
  Name: {
    type: String,
    required: true
    },
  Habit: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habits'
  }],
  Achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievements'
  }],
  Following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
});

module.exports = mongoose.model('Users', usersSchema);
