var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var User = require('./UserMdl.js')

var habitsSchema = new Schema({
  Name: {
    type: String
  },
  Kind: {
    type: String,
    enum: []
  },
  Private: {
    type: Boolean
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  Created: {
    type: Date
  },
  goalPoint: {
    timeFrame: {
      type: String,
      enum:[]
    }
  },
  StartingPoint: {
    timeFrame: {
      type: String,
      enum: []
    },
    frequency: {
      type: Number
    }
  },
  User: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'User'
  },
  Logs: [{
    type: Date
  }],
  Frequency: {
    enum: []
  }
})

module.exports = mongoose.model('Habits', habitsSchema);
