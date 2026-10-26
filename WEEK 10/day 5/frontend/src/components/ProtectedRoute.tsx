import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Loading } from './Feedback';

export function ProtectedRoute() {
  const { user, restoring } = useAppSelector((state) => state.auth);
  if (restoring) return <Loading label="Restoring your session" />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}