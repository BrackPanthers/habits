var mongoose = require('mongoose');

var achievementSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  achivement: {
    type: String,
    enum: [
      "Goal met one week",
      "Goal met two weeks",
      "Goal met one month"
    ]
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);
