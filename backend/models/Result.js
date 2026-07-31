const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: String, // format "4m 12s"
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
