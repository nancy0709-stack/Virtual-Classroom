const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Progress', ProgressSchema);
