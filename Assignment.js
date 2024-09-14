const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }]
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
