var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook_id: {
    type: String
  },
  google_id: {
    type: String
  },
  photo_url: {
    type: String
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  habits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  }],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
// ^^ this last line will auto generate timestamps

module.exports = mongoose.model('User', userSchema);
