const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' }, // 'student' or 'admin'
  enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

module.exports = mongoose.model('User', UserSchema);
