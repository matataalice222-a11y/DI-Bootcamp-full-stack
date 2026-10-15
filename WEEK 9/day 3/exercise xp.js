import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        }
      },
    },
    toggleTodo(state, action) {
      const todo = state.find((item) => item.id === action.payload)

      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
})