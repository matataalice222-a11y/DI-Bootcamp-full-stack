
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Base URL for JSONPlaceholder
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// READ all posts
app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

// READ single post
app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).send("Post not found");
  }
});

// CREATE post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

// UPDATE post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error updating post");
  }
});

// DELETE post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
});

app.listen(5000, () => console.log("Intermediate CRUD API running on port 5000"));
```

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = []; // In-memory user store
const SECRET_KEY = "supersecretkey";

// REGISTER
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send("User registered successfully");
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// PROFILE (protected route)
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("No token provided");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Profile data", user: decoded.username });
  } catch {
    res.status(401).send("Invalid token");
  }
});

app.listen(5000, () => console.log("User Login API running on port 5000"));
```


const express = require("express");
const app = express();
app.use(express.json());

let todos = [];
let idCounter = 1;

// CREATE todo
app.post("/api/todos", (req, res) => {
  const newTodo = { id: idCounter++, title: req.body.title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// READ all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// READ single todo
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

// UPDATE todo
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  res.json(todo);
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Todo not found");

  const deleted = todos.splice(index, 1);
  res.json(deleted);
});

app.listen(5000, () => console.log("Todo API running on port 5000"));
```

---

