import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";

const initialCategories = [
  { id: "work", name: "Work", color: "#52796f" },
  { id: "personal", name: "Personal", color: "#b77955" },
  { id: "learning", name: "Learning", color: "#6e70a5" },
];

const initialTasks = [
  {
    id: "task-1",
    title: "Plan the week",
    description: "Choose the three most important priorities.",
    categoryId: "work",
    progress: 100,
    completed: true,
  },
  {
    id: "task-2",
    title: "Review project notes",
    description: "Collect open questions before the team check-in.",
    categoryId: "work",
    progress: 60,
    completed: false,
  },
  {
    id: "task-3",
    title: "Take a long walk",
    description: "Make room for a screen-free break.",
    categoryId: "personal",
    progress: 0,
    completed: false,
  },
  {
    id: "task-4",
    title: "Practice Redux selectors",
    description: "Build a small example with createSelector.",
    categoryId: "learning",
    progress: 35,
    completed: false,
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasks,
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },
    editTask(state, action) {
      const task = state.find((item) => item.id === action.payload.id);
      if (task) Object.assign(task, action.payload.changes);
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTaskProgress(state, action) {
      const task = state.find((item) => item.id === action.payload.id);
      if (task) {
        task.progress = Math.min(100, Math.max(0, action.payload.progress));
        task.completed = task.progress === 100;
      }
    },
    setTaskCompleted(state, action) {
      const task = state.find((item) => item.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
        task.progress = action.payload.completed ? 100 : 0;
      }
    },
    deleteTasksForCategory(state, action) {
      return state.filter((task) => task.categoryId !== action.payload);
    },
  },
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategories,
  reducers: {
    addCategory(state, action) {
      state.push(action.payload);
    },
    editCategory(state, action) {
      const category = state.find((item) => item.id === action.payload.id);
      if (category) Object.assign(category, action.payload.changes);
    },
    deleteCategory(state, action) {
      return state.filter((category) => category.id !== action.payload);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  setTaskCompleted,
  deleteTasksForCategory,
} = tasksSlice.actions;
export const { addCategory, editCategory, deleteCategory } =
  categoriesSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export const selectAllTasks = (state) => state.tasks;
export const selectCategories = (state) => state.categories;

export const selectTasksByCategory = createSelector(
  [selectAllTasks, (_state, categoryId) => categoryId],
  (tasks, categoryId) =>
    categoryId === "all"
      ? tasks
      : tasks.filter((task) => task.categoryId === categoryId),
);

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.completed).length,
);

export const selectCategoryById = createSelector(
  [selectCategories, (_state, categoryId) => categoryId],
  (categories, categoryId) =>
    categories.find((category) => category.id === categoryId),
);