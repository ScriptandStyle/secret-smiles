const mongoose = require('mongoose');

const ActSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['kindness', 'story'],
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: '👤'
    },
    role: {
      type: String,
      default: 'Community Member'
    }
  },
  reactions: {
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  relatedActs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Act'
  }],
  sourceAct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Act'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Act', ActSchema);
module.exports = mongoose.model('Act', ActSchema); 