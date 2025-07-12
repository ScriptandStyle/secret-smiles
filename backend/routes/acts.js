const express = require('express');
const router = express.Router();
const Act = require('../models/Act');

// Get all acts by type
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const acts = await Act.find(query).populate('comments').sort({ date: -1 });
    res.json(acts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new act
router.post('/', async (req, res) => {
  const act = new Act({
    title: req.body.title,
    content: req.body.content,
    location: req.body.location,
    image: req.body.image,
    type: req.body.type || 'kindness',
    author: req.body.author
  });

  try {
    const newAct = await act.save();
    res.status(201).json(newAct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a happy story from kindness share
router.post('/happy-story', async (req, res) => {
  try {
    const { sourceActId, title, content, image } = req.body;
    if (!act) {
      return res.status(404).json({ message: 'Act not found' });
    }

    const { reactionType } = req.body;
    act.reactions[reactionType] += 1;
    
    const updatedAct = await act.save();
    res.json(updatedAct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 