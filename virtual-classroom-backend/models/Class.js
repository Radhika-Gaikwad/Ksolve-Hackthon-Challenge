const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  units: [{ 
    title: String, 
    sessions: [{ title: String, lectures: [String] }] 
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Class', ClassSchema);
