// Sample list of candidates
const candidates = [
  { name: 'John Doe', symbol: '🗳️' },
  { name: 'Jane Smith', symbol: '⚖️' },
  { name: 'Bob Johnson', symbol: '🌟' },
];

let hasVoted = false; // Flag to track if the voter has authenticated

// Handle voter authentication
document.getElementById('authenticate-btn').addEventListener('click', function () {
  const voterId = document.getElementById('voter-id').value.trim();

  if (hasVoted) {
    // If the voter has already voted, prevent re-submission
    document.getElementById('auth-error').textContent = 'You have already voted.';
    return;
  }

  if (voterId === 'ABC9876987') {
    // Mark that the voter has authenticated
    hasVoted = true;

    document.getElementById('voter-id-section').style.display = 'none';
    document.getElementById('vote-section').style.display = 'block';
    populateCandidates();
    document.getElementById('auth-error').textContent = ''; // Clear any previous errors
  } else if (voterId === '') {
    document.getElementById('auth-error').textContent = 'Please enter your Voter ID.';
  } else {
    document.getElementById('auth-error').textContent = 'Invalid Voter ID. Please try again.';
  }
});

// Populate candidates dropdown
function populateCandidates() {
  const candidateSelect = document.getElementById('candidate-select');

  // Clear any existing options
  candidateSelect.innerHTML = '<option value="" disabled selected>Select a candidate</option>';

  candidates.forEach((candidate, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${candidate.name} ${candidate.symbol}`;
    candidateSelect.appendChild(option);
  });
}

// Handle vote submission
document.getElementById('submit-vote-btn').addEventListener('click', function () {
  const candidateIndex = document.getElementById('candidate-select').value;

  if (candidateIndex !== null) {
    // Mock submission (you can replace this with an actual form submission or API call)
    document.getElementById('vote-section').style.display = 'none';
    const selectedCandidate = candidates[candidateIndex];
    document.getElementById('confirmation-message').textContent = `You voted for: ${selectedCandidate.name} ${selectedCandidate.symbol}`;
    document.getElementById('confirmation-message').style.display = 'block';
  } else {
    alert('Please select a candidate to vote.');
  }
});
// Handle voter authentication
document.getElementById('authenticate-btn').addEventListener('click', function () {
  const voterId = document.getElementById('voter-id').value.trim();

  // Call backend to authenticate
  fetch('http://localhost:3000/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ voterId }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Authenticated successfully.') {
      document.getElementById('voter-id-section').style.display = 'none';
      document.getElementById('vote-section').style.display = 'block';
      populateCandidates();
      document.getElementById('auth-error').textContent = ''; // Clear any previous errors
    } else {
      document.getElementById('auth-error').textContent = data.message;
    }
  })
  .catch(error => {
    document.getElementById('auth-error').textContent = 'Error: ' + error.message;
  });
});
// Handle vote submission
document.getElementById('submit-vote-btn').addEventListener('click', function () {
  const candidateIndex = document.getElementById('candidate-select').value;
  const voterId = document.getElementById('voter-id').value.trim();

  // Call backend to submit the vote
  fetch('http://localhost:3000/submit-vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ voterId, candidateIndex }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      document.getElementById('vote-section').style.display = 'none';
      document.getElementById('confirmation-message').textContent = data.message;
      document.getElementById('confirmation-message').style.display = 'block';
    } else {
      alert('Something went wrong. Please try again.');
    }
  })
  .catch(error => {
    alert('Error: ' + error.message);
  });
});


  
