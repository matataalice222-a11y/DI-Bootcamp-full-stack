


const express = require("express");
const app = express();
app.use(express.json());

// Simulated database
let posts = [
  { id: 1, title: "First Post", content: "Hello World!" },
  { id: 2, title: "Second Post", content: "Learning Express.js" }
];

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.json(post);
});

// CREATE new post
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// UPDATE post
app.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  post.title = req.body.title;
  post.content = req.body.content;
  res.json(post);
});

// DELETE post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Post not found");

  const deleted = posts.splice(index, 1);
  res.json(deleted);
});

// Error handling
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(3000, () => console.log("Blog API running on port 3000"));
```



const express = require("express");
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 }
];

// READ all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// READ book by ID
app.get("/api/books/:bookId", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).send("Book not found");
  res.status(200).json(book);
});

// CREATE new book
app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(5000, () => console.log("Book API running on port 5000"));
```
const axios = require("axios");

async function fetchPosts() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
}

module.exports = { fetchPosts };
```



const express = require("express");
const { fetchPosts } = require("./data/dataService");

const app = express();
app.use(express.json());

// Endpoint using Axios data module
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("Data successfully retrieved");
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error retrieving posts");
  }
});

app.listen(5000, () => console.log("CRUD API running on port 5000"));
```
