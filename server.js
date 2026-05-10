const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log(err));

// Recommendation Schema
const recommendationSchema = new mongoose.Schema({
  title: String,
  category: String,
  department: String,
  tags: [String],
  description: String,
  relevance: String
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

// GET all recommendations
app.get('/recommendations', async (req, res) => {
  const data = await Recommendation.find();
  res.json(data);
});

// POST add recommendation
app.post('/recommendations', async (req, res) => {
  const newRec = new Recommendation(req.body);
  await newRec.save();
  res.json(newRec);
});

// GET search history (mock)
app.get('/history', (req, res) => {
  res.json([
    { query: "What is AI ethics?", date: "Today" },
    { query: "Cybersecurity best practices", date: "Today" },
    { query: "Machine learning basics", date: "Yesterday" },
    { query: "Data privacy policies", date: "Yesterday" },
    { query: "Cloud computing fundamentals", date: "This Week" }
  ]);
});

// POST feedback
app.post('/feedback', async (req, res) => {
  console.log('Feedback received:', req.body);
  res.json({ message: 'Feedback saved successfully!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});