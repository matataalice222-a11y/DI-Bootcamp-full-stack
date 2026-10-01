const express = require('express');
const fs = require('fs');
const router = express.Router();

const TASKS_FILE = './tasks.json';

// Helper: Read tasks from file
function readTasks() {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper: Write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// GET /tasks - Retrieve all tasks
router.get('/', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// GET /tasks/:id - Retrieve a task by ID
router.get('/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const tasks = readTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: completed || false
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task
router.put('/:id', (req, res) => {
  const { title, completed } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  if (!title) return res.status(400).json({ error: 'Title is required' });

  tasks[taskIndex] = { ...tasks[taskIndex], title, completed };
  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
  const tasks = readTasks();
  const newTasks = tasks.filter(t => t.id !== parseInt(req.params.id));

  if (tasks.length === newTasks.length) return res.status(404).json({ error: 'Task not found' });

  writeTasks(newTasks);
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
