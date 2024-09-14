const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  units: [{ type: String }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);
