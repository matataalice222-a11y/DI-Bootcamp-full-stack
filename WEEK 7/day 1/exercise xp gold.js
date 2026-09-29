const express = require('express');
const router = express.Router();

// In-memory database
let posts = [];
let idCounter = 1;

// ✅ GET /posts - Retrieve all blog posts
router.get('/', (req, res) => {
  res.json(posts);
});

// ✅ GET /posts/:id - Retrieve a specific blog post by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// ✅ POST /posts - Create a new blog post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: idCounter++,
    title,
    content,
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// ✅ PUT /posts/:id - Update a blog post by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  posts[index] = {
    id,
    title,
    content,
    timestamp: new Date().toISOString()
  };

  res.json(posts[index]);
});

// ✅ DELETE /posts/:id - Delete a blog post by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
