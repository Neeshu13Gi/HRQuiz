const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['HR Policy', 'IQ Level', 'Finance'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
