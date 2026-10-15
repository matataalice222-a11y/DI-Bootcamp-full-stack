import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      )

      if (!response.ok) {
        return rejectWithValue(
          `The user service returned an error (${response.status}).`,
        )
      }

      const user = await response.json()

      if (
        !user ||
        typeof user !== 'object' ||
        typeof user.name !== 'string' ||
        typeof user.email !== 'string'
      ) {
        return rejectWithValue('The user service returned invalid user data.')
      }

      return user
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Unable to connect to the user service.',
      )
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Unable to load this user.'
      })
  },
})

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})