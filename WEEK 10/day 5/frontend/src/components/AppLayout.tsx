import { BookOpen, LogOut, Moon, Sun, UserRound } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { storyApi } from '../services/storyApi';

export function AppLayout({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const socketRef = useRef<Socket | null>(null);
  const activeStoryId = useRef<number | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const apiUrl = new URL(import.meta.env.VITE_API_URL ?? '/api', window.location.origin);
    const socket = io(apiUrl.origin, { auth: { accessToken }, withCredentials: true });
    socketRef.current = socket;
    socket.on('connect', () => {
      if (activeStoryId.current !== null) socket.emit('story:join', activeStoryId.current);
    });
    socket.on('stories:changed', () => {
      dispatch(storyApi.util.invalidateTags(['Stories']));
    });
    socket.on('story:changed', ({ storyId }: { storyId: number }) => {
      dispatch(storyApi.util.invalidateTags([
        'Stories',
        { type: 'Story', id: storyId },
        { type: 'Comments', id: storyId },
        { type: 'Contributors', id: storyId },
      ]));
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [accessToken, dispatch]);

  useEffect(() => {
    const match = location.pathname.match(/^\/stories\/(\d+)$/);
    const nextStoryId = match ? Number(match[1]) : null;
    if (activeStoryId.current !== null) socketRef.current?.emit('story:leave', activeStoryId.current);
    activeStoryId.current = nextStoryId;
    if (nextStoryId !== null && socketRef.current?.connected) {
      socketRef.current.emit('story:join', nextStoryId);
    }
  }, [location.pathname, accessToken]);

  async function handleLogout() {
    await dispatch(logout());
    dispatch(storyApi.util.resetApiState());
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-frame">
      <header className="topbar">
        <Link className="brand" to="/"><span className="brand-mark"><BookOpen size={17} /></span>fable<span>commons</span></Link>
        <nav className="top-nav" aria-label="Main navigation">
          <NavLink to="/" end>Stories</NavLink>
          <NavLink to="/profile"><UserRound size={15} /> Profile</NavLink>
          <button className="icon-button theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="user-menu" type="button" onClick={handleLogout} title="Sign out">
            <span className="avatar">{user?.displayName.slice(0, 1).toUpperCase()}</span>
            <span className="user-name">{user?.displayName}</span>
            <LogOut size={14} />
          </button>
        </nav>
      </header>
      <main className="main-content"><Outlet /></main>
      <footer className="app-footer"><span>FABLE COMMONS</span><span>Stories grow better together.</span></footer>
    </div>
  );
}