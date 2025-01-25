// Placeholder for support and against counts
let supportCount = 0;
let againstCount = 0;

// Object to track if a user has voted
let userVote = null; // Can be 'support', 'against', or null (not voted)

// Placeholder for discussion posts and descriptions
let discussions = {
  News1: {
    description: "This is the description for News1. It's about recent global events that are shaping politics today.",
    posts: ["Great news!", "I totally agree with this."]
  },
  News2: {
    description: "News2 is a story about technology advancements in AI and its impact on the workforce.",
    posts: ["I disagree with this topic.", "Interesting perspective."]
  },
  News3: {
    description: "News3 discusses the environmental impact of new policies around renewable energy.",
    posts: ["This is a step in the right direction.", "We need more action on this."]
  }
};

// Function to load a topic's discussion and description
function loadDiscussion(topic) {
  // Update the current topic heading
  document.getElementById('current-topic').textContent = topic;

  // Display the brief description of the topic
  document.getElementById('topic-description').textContent = discussions[topic].description;

  // Display the discussion posts for the selected topic
  const postsContainer = document.getElementById('discussion-posts');
  postsContainer.innerHTML = ''; // Clear previous posts
  discussions[topic].posts.forEach(post => {
    const postElement = document.createElement('p');
    postElement.textContent = post;
    postsContainer.appendChild(postElement);
  });

  // Show the poll section
  document.getElementById('poll-section').style.display = 'block';

  // Disable voting if the user has already voted
  if (userVote) {
    document.getElementById('support-button').disabled = true;
    document.getElementById('against-button').disabled = true;
    document.getElementById('poll-results').style.display = 'block';
  } else {
    document.getElementById('support-button').disabled = false;
    document.getElementById('against-button').disabled = false;
    document.getElementById('poll-results').style.display = 'none';
  }
}

// Function to handle voting
function vote(voteType) {
  if (userVote) {
    // If the user has already voted, don't allow them to vote again
    alert('You have already voted!');
    return;
  }

  // Record the user's vote
  userVote = voteType;

  // Update the vote counts
  if (voteType === 'support') {
    supportCount++;
  } else if (voteType === 'against') {
    againstCount++;
  }

  // Update the poll results
  document.getElementById('support-count').textContent = supportCount;
  document.getElementById('against-count').textContent = againstCount;

  // Disable the voting buttons to prevent further voting
  document.getElementById('support-button').disabled = true;
  document.getElementById('against-button').disabled = true;

  // Show the poll results
  document.getElementById('poll-results').style.display = 'block';
}

// Function to add a comment
function addComment() {
  const commentText = document.getElementById('new-comment').value.trim();
  
  if (commentText === '') {
    alert('Please write a comment.');
    return;
  }

  // Get the current topic and add the comment
  const currentTopic = document.getElementById('current-topic').textContent;
  if (discussions[currentTopic]) {
    discussions[currentTopic].posts.push(commentText);
  } else {
    discussions[currentTopic] = { posts: [commentText], description: '' };
  }

  // Add the new comment to the discussion section
  const postsContainer = document.getElementById('discussion-posts');
  const newCommentElement = document.createElement('p');
  newCommentElement.textContent = commentText;
  postsContainer.appendChild(newCommentElement);

  // Clear the textarea
  document.getElementById('new-comment').value = '';
}