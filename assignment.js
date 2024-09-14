const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assignmentController = require('../controllers/assignmentController');

router.post('/create', auth, assignmentController.createAssignment);
router.post('/submit/:assignmentId', auth, assignmentController.submitAssignment);
router.get('/:assignmentId/submissions', auth, assignmentController.getSubmissions);

module.exports = router;
