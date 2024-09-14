const express = require('express');
const { createLecture, addComment } = require('../controllers/lectureController');
const router = express.Router();
const auth = require('../middleware/auth'); // JWT middleware to protect routes

router.post('/create', auth, createLecture);
router.post('/comment', auth, addComment);

module.exports = router;
