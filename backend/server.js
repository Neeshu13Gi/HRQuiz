require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Question = require('./models/Question');
const Result = require('./models/Result');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quiz-challenge';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// API Routes

// GET questions by category and limit
app.get('/api/questions', async (req, res) => {
  try {
    const { category, limit } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    
    let questions = await Question.find(query);
    
    // Shuffle and limit
    questions = questions.sort(() => 0.5 - Math.random());
    if (limit) {
      questions = questions.slice(0, parseInt(limit));
    }
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching questions' });
  }
});

// GET all questions (for HR Panel)
app.get('/api/questions/all', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single question
app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update question
app.put('/api/questions/:id', async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Server error updating question' });
  }
});

// POST create new question
app.post('/api/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating question' });
  }
});

// DELETE question
app.delete('/api/questions/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting question' });
  }
});

// POST save result
app.post('/api/results', async (req, res) => {
  try {
    const newResult = new Result(req.body);
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ error: 'Server error saving result' });
  }
});

// GET leaderboard (top 10 results sorted by score and time)
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Sort by score descending, then by time ascending (if we store time in a sortable way, but for now just score)
    const topResults = await Result.find({}).sort({ score: -1 }).limit(10);
    res.json(topResults);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching leaderboard' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
