const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Allow frontend to connect

const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());

// In-memory voter database
let voterDatabase = {
  'ABC9876987': { hasVoted: false, vote: null }
};

const candidates = [
  { name: 'John Doe', symbol: '🗳️' },
  { name: 'Jane Smith', symbol: '⚖️' },
  { name: 'Bob Johnson', symbol: '🌟' }
];

// Authentication endpoint
app.post('/authenticate', (req, res) => {
  const { voterId } = req.body;

  if (voterDatabase[voterId]) {
    if (voterDatabase[voterId].hasVoted) {
      return res.status(400).json({ message: 'You have already voted.' });
    } else {
      return res.status(200).json({ message: 'Authenticated successfully.' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid Voter ID. Please try again.' });
  }
});

// Vote submission endpoint
app.post('/submit-vote', (req, res) => {
  const { voterId, candidateIndex } = req.body;

  if (!voterDatabase[voterId]) {
    return res.status(400).json({ message: 'Invalid Voter ID.' });
  }

  if (voterDatabase[voterId].hasVoted) {
    return res.status(400).json({ message: 'You have already voted.' });
  }

  if (candidateIndex < 0 || candidateIndex >= candidates.length) {
    return res.status(400).json({ message: 'Invalid candidate selection.' });
  }

  voterDatabase[voterId].hasVoted = true;
  voterDatabase[voterId].vote = candidates[candidateIndex];

  return res.status(200).json({ message: `You voted for: ${candidates[candidateIndex].name} ${candidates[candidateIndex].symbol}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
