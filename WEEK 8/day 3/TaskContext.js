import React, { createContext, useReducer } from "react";

export const TaskContext = createContext();

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

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
