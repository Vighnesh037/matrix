// Sample list of candidates
const candidates = [
    { name: 'John Doe', symbol: '🗳️' },
    { name: 'Jane Smith', symbol: '⚖️' },
    { name: 'Bob Johnson', symbol: '🌟' },
  ];
  
  // Handle voter authentication
  document.getElementById('authenticate-btn').addEventListener('click', function () {
    const voterId = document.getElementById('voter-id').value.trim();
    
    // Simple mock authentication check (replace with real verification logic)
    if (voterId === '12345') {
      document.getElementById('voter-id-section').style.display = 'none';
      document.getElementById('vote-section').style.display = 'block';
      populateCandidates();
      document.getElementById('auth-error').textContent = ''; // Clear any previous errors
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
      document.getElementById('confirmation-message').style.display = 'block';
    } else {
      alert('Please select a candidate to vote.');
    }
  });
  