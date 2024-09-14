const Class = require('../models/Class');

// Create Class
exports.createClass = async (req, res) => {
  const { title, description, units } = req.body;
  try {
    const newClass = new Class({ title, description, units, instructor: req.user.id });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ message: 'Error creating class', error: err.message });
  }
};

// Fetch All Classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('instructor').populate('students');
    res.status(200).json(classes);
  } catch (err) {
    res.status(404).json({ message: 'Classes not found' });
  }
};

// Enroll in Class
exports.enrollInClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const classToEnroll = await Class.findById(classId);
    if (!classToEnroll.students.includes(req.user.id)) {
      classToEnroll.students.push(req.user.id);
      await classToEnroll.save();
    }
    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error enrolling in class', error: err.message });
  }
};

const Class = require('../models/Class'); // Adjust path as necessary

const enrollInClass = async (req, res) => {
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
};

const searchClasses = async (req, res) => {
  const { query } = req.query;
  try {
    const classes = await Class.find({ title: new RegExp(query, 'i') });
    res.status(200).json(classes);
  } catch (err) {
    res.status(400).json({ message: 'Error searching classes', error: err.message });
  }
};

module.exports = { enrollInClass, searchClasses };
