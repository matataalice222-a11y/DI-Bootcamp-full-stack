
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false
);
```


const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'tododb',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;

const pool = require('../config/db');

const getAllTodos = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

const getTodoById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id=$1', [id]);
  return result.rows[0];
};

const createTodo = async (title) => {
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  return result.rows[0];
};

const updateTodo = async (id, title, completed) => {
  const result = await pool.query(
    'UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *',
    [title, completed, id]
  );
  return result.rows[0];
};

const deleteTodo = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
```


const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.getAllTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const newTodo = await Todo.createTodo(title);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await Todo.updateTodo(req.params.id, title, completed);
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.deleteTodo(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```


const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodo);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
```


const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());
app.use('/api', todoRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(3000, () => console.log('Server running on port 3000'));
```

