import React from "react";
import { TaskProvider } from "./TaskContext";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

function App() {
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

export default App;
