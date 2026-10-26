import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { AuthResponse } from '@story/types';
import { setCredentials, signOut } from '../features/auth/authSlice';
import type { RootState } from '../app/store';

const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

type ApiBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
let refreshRequest: Promise<AuthResponse | null> | null = null;

async function refreshSession(): Promise<AuthResponse | null> {
  try {
    const response = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) return null;
    return await response.json() as AuthResponse;
  } catch {
    return null;
  }
}

export const baseQueryWithReauth: ApiBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const publicAuthEndpoint = ['login', 'register', 'refreshSession'].includes(api.endpoint);

  if (result.error?.status === 401 && !publicAuthEndpoint) {
    refreshRequest ??= refreshSession();
    const refreshed = await refreshRequest;
    refreshRequest = null;

    if (refreshed) {
      api.dispatch(setCredentials(refreshed));
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
      api.dispatch({ type: 'storyApi/resetApiState' });
    }
  }

  return result;
};