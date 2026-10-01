const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const router = express.Router();

const USERS_FILE = './users.json';

// Helpers
function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// POST /register
router.post('/register', async (req, res) => {
  const { name, lastName, email, username, password } = req.body;
  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).send('error1: Missing fields');
  }

  const users = readUsers();
  if (users.find(u => u.username === username || u.password === password)) {
    return res.status(400).send('error1: Username or password already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    lastName,
    email,
    username,
    password: hashedPassword
  };

  users.push(newUser);
  writeUsers(users);
  res.send('register: User registered successfully');
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).send('error2: User not registered');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('error2: Incorrect credentials');

  res.send('login: Login successful');
});

// GET /users
router.get('/users', (req, res) => {
  res.json(readUsers());
});

// GET /users/:id
router.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// PUT /users/:id
router.put('/users/:id', (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('User not found');

  users[index] = { ...users[index], ...req.body };
  writeUsers(users);
  res.json(users[index]);
});

module.exports = router;
