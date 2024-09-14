// src/routes/classRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { enrollInClass, searchClasses } = require('../controllers/classController');

// Existing routes for classes
router.post('/enroll/:classId', auth, enrollInClass);

// Add the search route
router.get('/search', searchClasses);

module.exports = router;
