import { useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, editTask } from '../daily challange.js'

const EMPTY_TASKS = Object.freeze([])

function dateFromKey(day) {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date, 12)
}

function dateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function shiftDay(day, amount) {
  const date = dateFromKey(day)
  date.setDate(date.getDate() + amount)
  return dateKey(date)
}

function formatDay(day, options) {
  return new Intl.DateTimeFormat(undefined, options).format(dateFromKey(day))
}

function Calendar({ selectedDay, onSelectDay }) {
  const today = dateKey(new Date())

  return (
    <section aria-label="Choose a day" className="date-panel">
      <div className="date-navigation">
        <button
          aria-label="Previous day"
          className="date-arrow"
          onClick={() => onSelectDay(shiftDay(selectedDay, -1))}
          type="button"
        >
          ‹
        </button>
        <div className="selected-date">
          <span>{formatDay(selectedDay, { weekday: 'long' })}</span>
          <strong>{formatDay(selectedDay, { month: 'long', day: 'numeric' })}</strong>
        </div>
        <button
          aria-label="Next day"
          className="date-arrow"
          onClick={() => onSelectDay(shiftDay(selectedDay, 1))}
          type="button"
        >
          ›
        </button>
      </div>
      <div className="date-controls">
        <label className="date-input-label">
          <span>Choose a date</span>
          <input
            aria-label="Choose a date"
            onChange={(event) => {
              if (event.target.value) onSelectDay(event.target.value)
            }}
            type="date"
            value={selectedDay}
          />
        </label>
        {selectedDay !== today && (
          <button
            className="today-button"
            onClick={() => onSelectDay(today)}
            type="button"
          >
            Today
          </button>
        )}
      </div>
    </section>
  )
}

function AddTask({ day }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const titleId = useId()
  const timeId = useId()
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    dispatch(addTask(day, trimmedTitle, time))
    setTitle('')
    setTime('')
  }

  return (
    <form className="planner-add-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor={titleId}>
        Task name
      </label>
      <input
        autoComplete="off"
        id={titleId}
        maxLength={120}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add something to your day..."
        value={title}
      />
      <label className="visually-hidden" htmlFor={timeId}>
        Task time (optional)
      </label>
      <input
        aria-label="Task time (optional)"
        className="time-input"
        id={timeId}
        onChange={(event) => setTime(event.target.value)}
        type="time"
        value={time}
      />
      <button className="planner-add-button" disabled={!title.trim()} type="submit">
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  )
}

function TaskItem({ day, task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [time, setTime] = useState(task.time)
  const titleId = useId()
  const timeId = useId()
  const dispatch = useDispatch()

  function handleSave(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    dispatch(editTask({ day, id: task.id, title: trimmedTitle, time }))
    setIsEditing(false)
  }

  function handleCancel() {
    setTitle(task.title)
    setTime(task.time)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="task-item task-item-editing">
        <form className="edit-task-form" onSubmit={handleSave}>
          <label className="visually-hidden" htmlFor={titleId}>
            Edit task name
          </label>
          <input
            autoFocus
            id={titleId}
            maxLength={120}
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <label className="visually-hidden" htmlFor={timeId}>
            Edit task time
          </label>
          <input
            aria-label="Edit task time"
            className="time-input"
            id={timeId}
            onChange={(event) => setTime(event.target.value)}
            type="time"
            value={time}
          />
          <button className="icon-button save-button" type="submit">
            Save
          </button>
          <button
            className="icon-button"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </form>
      </li>
    )
  }

  return (
    <li className="task-item">
      <span aria-hidden="true" className="task-marker" />
      <span className="task-title">{task.title}</span>
      <span className="task-time">
        {task.time || 'Anytime'}
      </span>
      <button
        aria-label={`Edit ${task.title}`}
        className="icon-button task-action"
        onClick={() => setIsEditing(true)}
        type="button"
      >
        Edit
      </button>
      <button
        aria-label={`Delete ${task.title}`}
        className="icon-button delete-button task-action"
        onClick={() => dispatch(deleteTask({ day, id: task.id }))}
        type="button"
      >
        Delete
      </button>
    </li>
  )
}

function TaskList({ day }) {
  const tasks = useSelector((state) => state.planner[day] ?? EMPTY_TASKS)

  if (tasks.length === 0) {
    return (
      <div className="planner-empty-state">
        <span aria-hidden="true" className="empty-calendar-icon">
          ◷
        </span>
        <p>Nothing planned yet</p>
        <span>Add a task above and make today count.</span>
      </div>
    )
  }

  return (
    <ul aria-label={`Tasks for ${formatDay(day, { dateStyle: 'full' })}`} className="task-list">
      {tasks.map((task) => (
        <TaskItem day={day} key={task.id} task={task} />
      ))}
    </ul>
  )
}

function PlannerApp() {
  const [selectedDay, setSelectedDay] = useState(() => dateKey(new Date()))
  const tasks = useSelector(
    (state) => state.planner[selectedDay] ?? EMPTY_TASKS,
  )

  return (
    <main className="planner-page">
      <section aria-labelledby="planner-title" className="planner-card">
        <header className="planner-header">
          <div>
            <span className="planner-eyebrow">MAKE ROOM FOR WHAT MATTERS</span>
            <h1 id="planner-title">Daily planner</h1>
            <p>A little structure goes a long way.</p>
          </div>
          <span aria-hidden="true" className="header-sparkle">
            ✳
          </span>
        </header>

        <Calendar onSelectDay={setSelectedDay} selectedDay={selectedDay} />

        <section aria-label="Manage tasks" className="tasks-section">
          <div className="tasks-heading">
            <h2>Today&apos;s plan</h2>
            <span>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
          <AddTask day={selectedDay} />
          <TaskList day={selectedDay} />
        </section>

        <footer className="planner-footer">
          <span>One day at a time.</span>
          <span>{formatDay(selectedDay, { dateStyle: 'medium' })}</span>
        </footer>
      </section>
    </main>
  )
}

export default PlannerApp
