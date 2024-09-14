// routes/enrollment.js
const express = require('express');
const router = express.Router();
const User = require('../models/User1');
const auth = require('../middleware/auth'); // Middleware to authenticate user

router.post('/enroll/:classId', auth, async (req, res) => {
  const { classId } = req.params;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user.enrolled_classes.includes(classId)) {
      user.enrolled_classes.push(classId);
      await user.save();
    }
    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error enrolling in class', error: err.message });
  }
});

module.exports = router;
