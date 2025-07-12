const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  act: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Act',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema); 