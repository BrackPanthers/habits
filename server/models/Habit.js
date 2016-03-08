var mongoose = require('mongoose'),
    pointSchema = require('./schemas/pointSchema'),
    categorySchema = require('./schemas/categorySchema');

var habitSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },

  kind: {
    type: String,
    enum: ['more', 'less'],
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  is_private: {
    type: Boolean,
    default: false
  },

  category: categorySchema,

  goal_point: pointSchema,

  starting_point: pointSchema,

  logs: [{ //
    type: Date// ms timestamp, easier to work with
  }]
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
// ^^ this last line will auto generate timestamps

module.exports = mongoose.model('Habit', habitSchema);
