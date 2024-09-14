const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/auth'); // If authentication is needed

// Route for uploading a single file
router.post('/upload', auth, upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (err) {
    res.status(400).json({ message: 'Error uploading file', error: err.message });
  }
});

module.exports = router;
