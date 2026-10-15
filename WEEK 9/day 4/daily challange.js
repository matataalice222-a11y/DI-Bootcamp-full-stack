import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const updateDelay = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })

export const ageUpAsync = createAsyncThunk(
  'age/ageUpAsync',
  async (_, { getState }) => {
    await updateDelay(700)
    return getState().age.age + 1
  },
)

export const ageDownAsync = createAsyncThunk(
  'age/ageDownAsync',
  async (_, { getState, rejectWithValue }) => {
    if (getState().age.age <= 0) {
      return rejectWithValue('Age cannot be less than zero.')
    }

    await updateDelay(700)
    return getState().age.age - 1
  },
)

const ageSlice = createSlice({
  name: 'age',
  initialState: {
    age: 25,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.loading = false
        state.age = action.payload
      })
      .addCase(ageUpAsync.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload ?? action.error.message ?? 'Unable to update age.'
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.loading = false
        state.age = action.payload
      })
      .addCase(ageDownAsync.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload ?? action.error.message ?? 'Unable to update age.'
      })
  },
})

export const ageStore = configureStore({
  reducer: {
    age: ageSlice.reducer,
  },
})