import React, { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";

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

export default TaskInput;
