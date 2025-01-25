// Store discussions and poll results in memory
let discussions = {
  'Tech': {
    posts: [],
    support: 0,
    against: 0
  },
  'Science': {
    posts: [],
    support: 0,
    against: 0
  },
  'Movies': {
    posts: [],
    support: 0,
    against: 0
  },
  'Sports': {
    posts: [],
    support: 0,
    against: 0
  }
};

// Load a specific topic's discussion
function loadDiscussion(topic) {
  document.getElementById('current-topic').innerText = topic;
  const postsContainer = document.getElementById('discussion-posts');
  postsContainer.innerHTML = '';  // Clear existing posts
  
  discussions[topic].posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `<p><strong>User:</strong> ${post}</p>`;
    postsContainer.appendChild(postDiv);
  });

  // Load poll results
  document.getElementById('support-count').innerText = discussions[topic].support;
  document.getElementById('against-count').innerText = discussions[topic].against;
}

// Add a new comment
function addComment() {
  const topic = document.getElementById('current-topic').innerText;
  const newComment = document.getElementById('new-comment').value.trim();
  
  if (newComment) {
    discussions[topic].posts.push(newComment);  // Add comment to the relevant topic
    document.getElementById('new-comment').value = '';  // Clear the textarea
    loadDiscussion(topic);  // Reload the discussion
  } else {
    alert('Please enter a comment.');
  }
}

// Vote in the poll
function vote(choice) {
  const topic = document.getElementById('current-topic').innerText;
  
  if (choice === 'support') {
    discussions[topic].support++;
  } else if (choice === 'against') {
    discussions[topic].against++;
  }

  // Reload the poll results
  loadDiscussion(topic);
}
