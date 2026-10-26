import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Feather, Sparkles } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login, register } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ErrorNotice, getErrorMessage, Loading } from '../components/Feedback';

export function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const isSignup = mode === 'signup';
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<unknown>(null);
  const [submitting, setSubmitting] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (isSignup) {
        await dispatch(register({ email, username, displayName: displayName || undefined, password })).unwrap();
      } else {
        await dispatch(login({ email, password })).unwrap();
      }
      navigate('/', { replace: true });
    } catch (requestError) {
      setError(requestError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-story-panel">
        <Link to="/login" className="brand auth-brand"><span className="brand-mark"><BookOpen size={17} /></span>fable<span>commons</span></Link>
        <div className="auth-quote">
          <span className="quote-mark">“</span>
          <blockquote>Every good story starts with someone willing to begin.</blockquote>
          <p>A shared space for the stories still finding their way.</p>
        </div>
        <div className="auth-chapter"><span>THE COMMONPLACE BOOK</span><span>VOL. 01 &nbsp; / &nbsp; 2026</span></div>
      </section>
      <section className="auth-form-panel">
        <Link to="/" className="back-link"><ArrowLeft size={15} /> Home</Link>
        <div className="auth-form-wrap">
          <div className="auth-mark"><Feather size={19} /></div>
          <p className="eyebrow">{isSignup ? 'PULL UP A CHAIR' : 'WELCOME BACK'}</p>
          <h1>{isSignup ? 'Make yourself at home.' : 'Pick up where you left off.'}</h1>
          <p className="auth-intro">{isSignup ? 'Create an account and start a story with your people.' : 'Your stories are right where you left them.'}</p>
          {error ? <ErrorNotice message={getErrorMessage(error)} /> : null}
          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup ? <>
              <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="storykeeper" autoComplete="username" minLength={3} maxLength={30} required /></label>
              <label>Display name<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="How others know you" maxLength={80} /></label>
            </> : null}
            <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" maxLength={255} required /></label>
            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isSignup ? '12+ characters, mixed case and a symbol' : 'Your password'} autoComplete={isSignup ? 'new-password' : 'current-password'} minLength={isSignup ? 12 : 1} maxLength={128} required /></label>
            <button className="primary-button auth-submit" type="submit" disabled={submitting}>{submitting ? <><Loading label="One moment" /></> : <>{isSignup ? 'Create your account' : 'Sign in'} <ArrowRight size={16} /></>}</button>
          </form>
          <p className="auth-switch">{isSignup ? 'Already have a place here?' : 'New to the commons?'} <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Sign in' : 'Create an account'}</Link></p>
          <div className="auth-footnote"><Sparkles size={14} /> Stories belong to the people who make them.</div>
        </div>
      </section>
    </main>
  );
}