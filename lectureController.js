const Lecture = require('../models/Lecture');
const Comment = require('../models/Comment');

// Create Lecture
exports.createLecture = async (req, res) => {
  const { title, content, sessionId } = req.body;
  try {
    const newLecture = new Lecture({ title, content, session: sessionId });
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (err) {
    res.status(400).json({ message: 'Error creating lecture', error: err.message });
  }
};

// Get Lecture by ID
exports.getLectureById = async (req, res) => {
  const { id } = req.params;
  try {
    const lecture = await Lecture.findById(id).populate('comments');
    res.status(200).json(lecture);
  } catch (err) {
    res.status(404).json({ message: 'Lecture not found' });
  }
};

// Add Comment (with nesting)
exports.addComment = async (req, res) => {
  const { lectureId, text, parentId } = req.body;
  const userId = req.user.id;
  try {
    const newComment = new Comment({ text, lecture: lectureId, user: userId, parent: parentId });
    await newComment.save();

    // If parent comment exists, add the new comment as a reply
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    }

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: 'Error adding comment', error: err.message });
  }
};

// Fetch Comments for a Lecture
exports.getLectureComments = async (req, res) => {
  const { lectureId } = req.params;
  try {
    const comments = await Comment.find({ lecture: lectureId }).populate('user').populate('replies');
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: 'Comments not found' });
  }
};
exports.addComment = async (req, res) => {
  const { lectureId, text, parentId } = req.body;
  const userId = req.user.id;
  try {
    const newComment = new Comment({ text, lecture: lectureId, user: userId, parent: parentId });
    await newComment.save();

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    }

    // Broadcast notification via socket.io
    io.emit('newComment', { lectureId, comment: newComment });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: 'Error adding comment', error: err.message });
  }
};
