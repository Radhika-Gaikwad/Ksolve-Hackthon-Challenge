const express = require('express');
const Lecture = require('../models/Lecture');
const Comment = require('../models/Comment');
const { verifyToken, isStudent } = require('../middleware/auth');

const router = express.Router();

// Add a comment to a lecture
router.post('/:lectureId/comment', verifyToken, isStudent, async (req, res) => {
  const { content, parentCommentId } = req.body;

  const comment = new Comment({
    user: req.user.id,
    content,
    parentCommentId,
  });

  await comment.save();

  const lecture = await Lecture.findById(req.params.lectureId);
  lecture.comments.push(comment._id);
  await lecture.save();

  res.json({ message: 'Comment added successfully', comment });
});

// Get comments for a lecture
router.get('/:lectureId/comments', verifyToken, isStudent, async (req, res) => {
  const lecture = await Lecture.findById(req.params.lectureId).populate({
    path: 'comments',
    populate: {
      path: 'replies',
    },
  });

  res.json(lecture.comments);
});

module.exports = router;
