import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import { storyApi } from '../services/storyApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [storyApi.reducerPath]: storyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;