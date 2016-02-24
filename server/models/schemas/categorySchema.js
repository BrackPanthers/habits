var mongoose = require('mongoose');

module.exports = {
  type: String,
  enum: [
    'Exercise',
    'Diet',
    'Personal Growth',
    'Relationships',
    'Hygiene',
    'General Health',
    'Community',
    'Technology',
    'Sleep',
    'Finances',
    'Hobbies',
    'Other'
  ]
};
