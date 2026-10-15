import { useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, toggleTodo } from '../exercise xp.js'
import './App.css'

function AddTodo() {
  const [title, setTitle] = useState('')
  const inputId = useId()
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    dispatch(addTodo(trimmedTitle))
    setTitle('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor={inputId}>
        New todo
      </label>
      <input
        autoComplete="off"
        id={inputId}
        maxLength={120}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to get done?"
        value={title}
      />
      <button className="add-button" disabled={!title.trim()} type="submit">
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  )
}

function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const checkboxId = useId()

  return (
    <li className={`todo-item${todo.completed ? ' is-completed' : ''}`}>
      <input
        aria-label={`${todo.completed ? 'Mark' : 'Complete'} ${todo.title}`}
        checked={todo.completed}
        className="todo-checkbox"
        id={checkboxId}
        onChange={() => dispatch(toggleTodo(todo.id))}
        type="checkbox"
      />
      <label className="todo-title" htmlFor={checkboxId}>
        {todo.title}
      </label>
      <button
        aria-label={`Remove ${todo.title}`}
        className="remove-button"
        onClick={() => dispatch(removeTodo(todo.id))}
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

function TodoList() {
  const todos = useSelector((state) => state.todos)

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true" className="empty-icon">
          ✓
        </span>
        <p>Your list is clear</p>
        <span>Add a task above to get started.</span>
      </div>
    )
  }

  return (
    <ul aria-label="Todo items" className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

function App() {
  const todos = useSelector((state) => state.todos)
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <main className="page">
      <section aria-labelledby="page-title" className="todo-card">
        <header className="card-header">
          <span className="eyebrow">A LITTLE MORE FOCUS</span>
          <h1 id="page-title">My todos</h1>
          <p>Make space for what matters.</p>
        </header>

        <AddTodo />
        <TodoList />

        <footer className="card-footer">
          <span>
            {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} left
          </span>
          <span>{completedCount} completed</span>
        </footer>
      </section>
      <p className="page-note">Small steps add up.</p>
    </main>
  )
}

export default App
