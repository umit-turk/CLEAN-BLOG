const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TextSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Text = mongoose.model('Text', TextSchema);

module.exports = Text;
