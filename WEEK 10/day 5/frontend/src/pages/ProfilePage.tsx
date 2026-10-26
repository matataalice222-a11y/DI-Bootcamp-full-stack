import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ErrorNotice, getErrorMessage } from '../components/Feedback';
import { updateUser } from '../features/auth/authSlice';
import { useUpdateProfileMutation } from '../services/storyApi';

export function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');
    setError('');
    try {
      const result = await updateProfile({ displayName }).unwrap();
      if (user) dispatch(updateUser({ ...user, displayName: result.user.displayName }));
      setNotice('Your name has been updated.');
    } catch (requestError) { setError(getErrorMessage(requestError)); }
  }

  return <section className="profile-page"><Link className="back-link" to="/"><ArrowLeft size={15} /> Back to stories</Link><div className="profile-heading"><span className="profile-icon"><UserRound size={21} /></span><p className="eyebrow">YOUR PLACE IN THE COMMONS</p><h1>Make it yours.</h1><p>Set the name that appears beside your stories and notes.</p></div><form className="profile-form" onSubmit={handleSubmit}>{error ? <ErrorNotice message={error} /> : null}{notice ? <p className="success-note"><Check size={15} />{notice}</p> : null}<label>Email address<input value={user?.email ?? ''} readOnly /></label><label>Username<input value={user?.username ?? ''} readOnly /></label><label>Display name<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={80} required /></label><button className="primary-button" type="submit" disabled={isLoading}>Save profile <Check size={15} /></button></form></section>;
}