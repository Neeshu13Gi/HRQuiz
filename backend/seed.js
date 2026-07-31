require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quiz-challenge';

const sampleQuestions = [
  {
    title: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    category: 'HR Policy'
  },
  {
    title: 'Largest planet in solar system?',
    options: ['Mars', 'Jupiter', 'Saturn', 'Earth'],
    correctAnswer: 'Jupiter',
    category: 'IQ Level'
  },
  {
    title: 'HTML stands for...',
    options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these'],
    correctAnswer: 'Hyper Text Markup Language',
    category: 'Finance'
  },
  {
    title: 'Speed of light is...',
    options: ['300,000 km/s', '150,000 km/s', '400,000 km/s', '500,000 km/s'],
    correctAnswer: '300,000 km/s',
    category: 'IQ Level'
  },
  {
    title: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    category: 'IQ Level'
  },
  {
    title: 'Standard working hours as per HR policy?',
    options: ['8 hours', '9 hours', '10 hours', '7 hours'],
    correctAnswer: '9 hours',
    category: 'HR Policy'
  },
  {
    title: 'What does ROI stand for?',
    options: ['Return on Investment', 'Rate of Interest', 'Return on Income', 'None'],
    correctAnswer: 'Return on Investment',
    category: 'Finance'
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding database...');
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error seeding DB', err));
