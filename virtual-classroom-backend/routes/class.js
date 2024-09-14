const express = require('express');
const Class = require('../models/Class');
const User = require('../models/User');
const { verifyToken, isAdmin, isStudent } = require('../middleware/auth');

const router = express.Router();

// Create a new class (Admin only)
router.post('/create', verifyToken, isAdmin, async (req, res) => {
  const { title, units } = req.body;
  const newClass = new Class({
    title,
    units
  });

  await newClass.save();
  res.json({ message: 'Class created successfully' });
});

// Enroll a student in a class (Admin only)
router.post('/enroll', verifyToken, isAdmin, async (req, res) => {
  const { classId, studentId } = req.body;

  const classData = await Class.findById(classId);
  const student = await User.findById(studentId);

  if (!classData || !student) {
    return res.status(400).json({ message: 'Invalid class or student ID' });
  }

  classData.students.push(student._id);
  student.enrolledClasses.push(classData._id);

  await classData.save();
  await student.save();

  res.json({ message: 'Student enrolled successfully' });
});

// Get all classes for an enrolled student
router.get('/enrolled-classes', verifyToken, isStudent, async (req, res) => {
  const user = await User.findById(req.user.id).populate('enrolledClasses');
  res.json(user.enrolledClasses);
});

// Get class content by ID (only if the student is enrolled)
router.get('/:id', verifyToken, isStudent, async (req, res) => {
  const classData = await Class.findById(req.params.id);

  if (!classData.students.includes(req.user.id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(classData);
});

module.exports = router;
