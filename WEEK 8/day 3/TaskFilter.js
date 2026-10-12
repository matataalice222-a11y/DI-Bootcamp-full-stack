import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";

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

export default TaskFilter;
