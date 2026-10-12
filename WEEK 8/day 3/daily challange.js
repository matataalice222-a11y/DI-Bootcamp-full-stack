import React, { createContext, useContext, useReducer, useRef, useState } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: "all",
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const text = action.payload.trim();
      if (!text) return state;
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text, completed: false }],
      };
    }

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };

    case "EDIT_TASK": {
      const text = action.payload.text.trim();
      if (!text) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, text } : task
        ),
      };
    }

    case "FILTER_TASKS":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function TaskInput() {
  const { dispatch } = useContext(TaskContext);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: text });
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        style={{ flex: 1, padding: "8px" }}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}

function TaskFilter() {
  const { state, dispatch } = useContext(TaskContext);
  const filters = ["all", "completed", "active"];

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch({ type: "FILTER_TASKS", payload: filter })}
          style={{
            background: state.filter === filter ? "#333" : "#eee",
            color: state.filter === filter ? "#fff" : "#000",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

function TaskList() {
  const { state, dispatch } = useContext(TaskContext);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "completed") return task.completed;
    if (state.filter === "active") return !task.completed;
    return true;
  });

  const saveEdit = (id) => {
    const newText = inputRef.current?.value.trim();
    if (!newText) return;
    dispatch({ type: "EDIT_TASK", payload: { id, text: newText } });
    setEditingId(null);
  };

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "10px",
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        >
          {editingId === task.id ? (
            <>
              <input ref={inputRef} defaultValue={task.text} style={{ flex: 1, padding: "6px" }} />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <>
              <span
                onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
                style={{
                  flex: 1,
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => setEditingId(task.id)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
        <h1>Task Manager</h1>
        <TaskInput />
        <TaskFilter />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

