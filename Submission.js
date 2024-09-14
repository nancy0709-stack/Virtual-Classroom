const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: { type: String, required: true },
  grade: { type: Number, default: null }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
