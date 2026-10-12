import React, { useContext, useRef, useState } from "react";
import { TaskContext } from "./TaskContext";

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

export default TaskList;
