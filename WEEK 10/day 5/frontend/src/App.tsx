import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { restoreSession } from './features/auth/authSlice';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { StoryPage } from './pages/StoryPage';

type Theme = 'dark' | 'light';

export default function App() {
  const dispatch = useAppDispatch();
  const restoring = useAppSelector((state) => state.auth.restoring);
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem('fable-theme') === 'light' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('fable-theme', theme);
  }, [theme]);

  useEffect(() => {
    void dispatch(restoreSession());
  }, [dispatch]);

  return <Routes>
    <Route path="/login" element={restoring ? null : <AuthPage mode="login" />} />
    <Route path="/signup" element={restoring ? null : <AuthPage mode="signup" />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories/:id" element={<StoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}