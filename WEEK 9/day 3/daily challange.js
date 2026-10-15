import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit'

const plannerSlice = createSlice({
  name: 'planner',
  initialState: {},
  reducers: {
    addTask: {
      reducer(state, action) {
        const { day, task } = action.payload
        state[day] ??= []
        state[day].push(task)
      },
      prepare(day, title, time = '') {
        return {
          payload: {
            day,
            task: {
              id: nanoid(),
              title,
              time,
            },
          },
        }
      },
    },
    editTask(state, action) {
      const { day, id, title, time } = action.payload
      const task = state[day]?.find((item) => item.id === id)

      if (task) {
        task.title = title
        task.time = time
      }
    },
    deleteTask(state, action) {
      const { day, id } = action.payload
      const dayTasks = state[day]

      if (dayTasks) {
        state[day] = dayTasks.filter((task) => task.id !== id)

        if (state[day].length === 0) {
          delete state[day]
        }
      }
    },
  },
})

export const { addTask, editTask, deleteTask } = plannerSlice.actions

export const store = configureStore({
  reducer: {
    planner: plannerSlice.reducer,
  },
})