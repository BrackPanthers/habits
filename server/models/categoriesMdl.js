var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
  Categories: {
    type: array
  }
});

module.exports = mongoose.model('Categories', categoriesSchema);
