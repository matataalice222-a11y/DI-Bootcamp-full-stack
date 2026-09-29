
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'blogdb',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
const pool = require('../config/db');

const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

const createPost = async (title, content) => {
  const result = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return result.rows[0];
};

const updatePost = async (id, title, content) => {
  const result = await pool.query(
    'UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *',
    [title, content, id]
  );
  return result.rows[0];
};

const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id=$1', [id]);
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
```


const Post = require('../models/postModel');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.createPost(title, content);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.updatePost(req.params.id, title, content);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.deletePost(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
```


const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use('/api', postRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(3000, () => console.log('Server running on port 3000'));
```


const pool = require('../config/db');

const getAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
};

const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
  return result.rows[0];
};

const createBook = async (title, author, publishedYear) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, publishedYear) VALUES ($1, $2, $3) RETURNING *',
    [title, author, publishedYear]
  );
  return result.rows[0];
};

module.exports = { getAllBooks, getBookById, createBook };
```


const Book = require('../models/bookModel');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const newBook = await Book.createBook(title, author, publishedYear);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```


const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getBooks);
router.get('/books/:bookId', bookController.getBook);
router.post('/books', bookController.createBook);

module.exports = router;
```


const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());
app.use('/api', bookRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
```