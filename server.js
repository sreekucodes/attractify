// Attractify Fullstack Application - Production-Ready Code

// Project Structure:
// - Frontend: React.js (Styled with Tailwind CSS)
// - Backend: Node.js with Express
// - API Integration: OpenAI for generating suggestions
// - Database: MongoDB (optional, for future user persistence)

// Install necessary packages:
// npm install express openai react react-dom react-scripts tailwindcss axios cors dotenv

// Backend Code (Node.js with Express)
// File: server.js
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint to receive dating profile input and return suggestions
app.post('/api/improve-profile', async (req, res) => {
  try {
    const { profileText } = req.body;
    if (!profileText) return res.status(400).json({ error: 'Profile text is required' });

    const prompt = `Enhance this dating profile by highlighting confidence, authenticity, and intrigue, based on principles from human psychology: "${profileText}"`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const improvedProfile = response.data.choices[0].text.trim();
    res.json({ improvedProfile });
  } catch (error) {
    console.error('Error generating suggestion:', error);
    res.status(500).json({ error: 'Failed to generate profile suggestion' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});