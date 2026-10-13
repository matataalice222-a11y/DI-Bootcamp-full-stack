import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SET_SELECTED_DAY = "SET_SELECTED_DAY";

export const addTask = (day, task) => ({
  type: ADD_TASK,
  payload: { day, task },
});

export const editTask = (day, taskId, updatedTask) => ({
  type: EDIT_TASK,
  payload: { day, taskId, updatedTask },
});

export const deleteTask = (day, taskId) => ({
  type: DELETE_TASK,
  payload: { day, taskId },
});

export const setSelectedDay = (day) => ({
  type: SET_SELECTED_DAY,
  payload: day,
});

const initialState = {
  tasksByDay: {},
  selectedDay: "",
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { day, task } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: [...(state.tasksByDay[day] || []), task],
        },
      };
    }

    case EDIT_TASK: {
      const { day, taskId, updatedTask } = action.payload;
      const tasks = state.tasksByDay[day] || [];
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          ),
        },
      };
    }

    case DELETE_TASK: {
      const { day, taskId } = action.payload;
      const tasks = state.tasksByDay[day] || [];
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [day]: tasks.filter((task) => task.id !== taskId),
        },
      };
    }

    case SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };

    default:
      return state;
  }
}

export const store = createStore(taskReducer);

function DatePicker() {
  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    dispatch(setSelectedDay(event.target.value));
  };

  return <input type="date" value={useSelector((state) => state.selectedDay)} onChange={handleDateChange} />;
}

function TaskList({ onEdit }) {
  const dispatch = useDispatch();
  const { selectedDay, tasksByDay } = useSelector((state) => state);
  const tasks = tasksByDay[selectedDay] || [];

  if (!selectedDay) {
    return <p>Please choose a date to view your tasks.</p>;
  }

  return (
    <div>
      <h3>Tasks for {selectedDay}</h3>
      {tasks.length === 0 ? (
        <p>No tasks for this day yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <button type="button" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button
                type="button"
                onClick={() => dispatch(deleteTask(selectedDay, task.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskForm({ editingTask, setEditingTask }) {
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state) => state);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(editingTask ? editingTask.title : "");
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!selectedDay) {
      alert("Please select a day before adding a task.");
      return;
    }

    if (!trimmedTitle) {
      alert("Task title cannot be empty.");
      return;
    }

    if (editingTask) {
      dispatch(editTask(selectedDay, editingTask.id, { title: trimmedTitle }));
      setEditingTask(null);
    } else {
      const newTask = { id: Date.now(), title: trimmedTitle };
      dispatch(addTask(selectedDay, newTask));
    }

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">{editingTask ? "Update" : "Add"} Task</button>
      {editingTask && (
        <button type="button" onClick={() => setEditingTask(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

function App() {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div>
      <h1>Daily Planner</h1>
      <DatePicker />
      <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
      <TaskList onEdit={setEditingTask} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
