const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Act = require('../models/Act');

// Add a comment to an act
router.post('/', async (req, res) => {
  try {
    const comment = new Comment({
      act: req.body.actId,
      author: req.body.author,
      content: req.body.content
    });

    const savedComment = await comment.save();
    
    // Update the act's comments count
    await Act.findByIdAndUpdate(req.body.actId, {
      $push: { comments: savedComment._id },
      $inc: { 'reactions.comments': 1 }
    });

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get comments for an act
router.get('/act/:actId', async (req, res) => {
  try {
    const comments = await Comment.find({ act: req.params.actId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 