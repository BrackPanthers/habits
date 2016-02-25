var mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    time_frame: {type: String, enum: ['week', 'day']},
    frequency: {type: Number, max: 7}
  },
  {_id: false} // makes sure unique id is not created for each time frame entry
);
