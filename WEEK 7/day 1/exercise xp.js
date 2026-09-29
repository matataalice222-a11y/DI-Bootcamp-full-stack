

// Import router
const indexRouter = require('./routes/index');

// Mount router
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```


const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
  res.send('Welcome to the Homepage!');
});

// About route
router.get('/about', (req, res) => {
  res.send('About Us: This is a simple Express.js app.');
});

module.exports = router;
```



// Middleware to parse JSON
app.use(express.json());

// Import todos router
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```


// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Add new todo
router.post('/', (req, res) => {
  const newTodo = { id: idCounter++, ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update todo by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    todos[index] = { id, ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete todo by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
```

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import books router
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Add new book
router.post('/', (req, res) => {
  const newBook = { id: idCounter++, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update book by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books[index] = { id, ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete book by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
```

