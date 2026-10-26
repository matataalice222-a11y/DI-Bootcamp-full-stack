import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from '../api/api';
import type { DataState, FetchRecipesArgs, RecipeSummary } from '../types/types';

export const loadRecipes = createAsyncThunk<
  RecipeSummary[],
  FetchRecipesArgs,
  { rejectValue: string }
>('recipes/load', async (args, { signal, rejectWithValue }) => {
  try {
    return await fetchRecipes(args, signal);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    return rejectWithValue(error instanceof Error ? error.message : 'Something went wrong while loading recipes.');
  }
});

const initialState: DataState<RecipeSummary> = {
  items: [],
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearRecipes(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecipes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadRecipes.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Something went wrong while loading recipes.';
      });
  },
});

export const { clearRecipes } = dataSlice.actions;
export default dataSlice.reducer;