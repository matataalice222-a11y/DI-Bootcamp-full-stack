import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, User } from '@story/types';

const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  restoring: boolean;
  restoreStarted: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

interface Registration extends Credentials {
  username: string;
  displayName?: string;
}

interface AuthFailure {
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

async function authRequest(path: string, body?: unknown): Promise<AuthResponse> {
  const response = await fetch(`${apiUrl}/auth/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const payload = await response.json() as AuthResponse & AuthFailure;
  if (!response.ok) throw payload;
  return payload;
}

export const login = createAsyncThunk<AuthResponse, Credentials, { rejectValue: AuthFailure }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try { return await authRequest('login', credentials); }
    catch (error) { return rejectWithValue(error as AuthFailure); }
  },
);

export const register = createAsyncThunk<AuthResponse, Registration, { rejectValue: AuthFailure }>(
  'auth/register',
  async (input, { rejectWithValue }) => {
    try { return await authRequest('register', input); }
    catch (error) { return rejectWithValue(error as AuthFailure); }
  },
);

export const restoreSession = createAsyncThunk<AuthResponse, void, { rejectValue: AuthFailure }>(
  'auth/restore',
  async (_, { rejectWithValue }) => {
    try { return await authRequest('refresh'); }
    catch (error) { return rejectWithValue(error as AuthFailure); }
  },
  { condition: (_, { getState }) => !(getState() as { auth: AuthState }).auth.restoreStarted },
);

export const logout = createAsyncThunk<void>('auth/logout', async () => {
  try {
    await fetch(`${apiUrl}/auth/logout`, { method: 'POST', credentials: 'include' });
  } catch {
    return;
  }
});

const initialState: AuthState = {
  user: null,
  accessToken: null,
  restoring: true,
  restoreStarted: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.restoring = false;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
      state.accessToken = null;
      state.restoring = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.restoreStarted = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.restoring = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.restoring = false;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.restoring = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.restoring = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { setCredentials, signOut, updateUser } = authSlice.actions;
export default authSlice.reducer;