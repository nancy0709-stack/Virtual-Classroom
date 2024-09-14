// routes/search.js
const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const classes = await Class.find({ title: new RegExp(query, 'i') });
    res.status(200).json(classes);
  } catch (err) {
    res.status(400).json({ message: 'Error searching classes', error: err.message });
  }
});

module.exports = router;
