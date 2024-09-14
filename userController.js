const User = require('../models/User1');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Current User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found', error: err.message });
  }
};
// Mark Lecture as Completed
exports.markLectureCompleted = async (req, res) => {
  const { lectureId } = req.params;
  const userId = req.user.id;
  try {
    let progress = await Progress.findOne({ user: userId, lecture: lectureId });
    if (!progress) {
      progress = new Progress({ user: userId, lecture: lectureId, isCompleted: true });
    } else {
      progress.isCompleted = true;
    }
    await progress.save();
    res.status(200).json({ message: 'Lecture marked as completed' });
  } catch (err) {
    res.status(400).json({ message: 'Error marking lecture', error: err.message });
  }
};

// Fetch Progress for a Lecture
exports.getProgress = async (req, res) => {
  const { lectureId } = req.params;
  const userId = req.user.id;
  try {
    const progress = await Progress.findOne({ user: userId, lecture: lectureId });
    res.status(200).json(progress);
  } catch (err) {
    res.status(404).json({ message: 'Progress not found' });
  }
};
