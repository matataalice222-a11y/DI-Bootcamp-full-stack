import { useEffect, useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../exercise xp.js'
import './App.css'

function UserData() {
  const dispatch = useDispatch()
  const { data: user, status, error } = useSelector((state) => state.user)
  const [userId, setUserId] = useState('1')
  const inputId = useId()
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchUser(1))
  }, [dispatch])

  function handleSubmit(event) {
    event.preventDefault()
    const parsedId = Number(userId)

    if (!Number.isInteger(parsedId) || parsedId < 1) return

    dispatch(fetchUser(parsedId))
  }

  const initials = user?.name
    ?.split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <main className="page">
      <section aria-labelledby="page-title" className="user-card">
        <header className="card-header">
          <span className="eyebrow">REDUX TOOLKIT · ASYNC THUNK</span>
          <h1 id="page-title">User directory</h1>
          <p>Fetch a profile and explore the details.</p>
        </header>

        <form className="lookup-form" onSubmit={handleSubmit}>
          <label htmlFor={inputId}>User ID</label>
          <div className="lookup-controls">
            <input
              id={inputId}
              max="999"
              min="1"
              onChange={(event) => setUserId(event.target.value)}
              type="number"
              value={userId}
            />
            <button className="fetch-button" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <span aria-hidden="true" className="spinner" />
                  Loading profile
                </>
              ) : (
                'Fetch profile'
              )}
            </button>
          </div>
        </form>

        <section aria-label="User profile" aria-live="polite" className="profile-area">
          {isLoading && (
            <div className="feedback-state" role="status">
              <span aria-hidden="true" className="spinner large-spinner" />
              <p>Fetching user profile...</p>
            </div>
          )}

          {status === 'failed' && (
            <div className="error-state" role="alert">
              <span aria-hidden="true" className="error-icon">
                !
              </span>
              <div>
                <strong>Couldn&apos;t load this profile</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <div className="feedback-state">
              <p>Choose a user ID to load a profile.</p>
            </div>
          )}

          {status === 'succeeded' && user && (
            <article aria-label={`${user.name} profile`} className="profile">
              <div className="profile-heading">
                <div aria-hidden="true" className="avatar">
                  {initials}
                </div>
                <div className="identity">
                  <span className="profile-label">PROFILE · #{user.id}</span>
                  <h2>{user.name}</h2>
                  <p>@{user.username}</p>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-row">
                  <span aria-hidden="true" className="detail-icon">
                    @
                  </span>
                  <div>
                    <span className="detail-label">Email</span>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </div>
                </div>
                <div className="detail-row">
                  <span aria-hidden="true" className="detail-icon">
                    ↗
                  </span>
                  <div>
                    <span className="detail-label">Website</span>
                    <a
                      href={`https://${user.website}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
                <div className="detail-row">
                  <span aria-hidden="true" className="detail-icon">
                    ⌖
                  </span>
                  <div>
                    <span className="detail-label">Location</span>
                    <span>
                      {user.address.city}, {user.address.street}
                    </span>
                  </div>
                </div>
                <div className="detail-row">
                  <span aria-hidden="true" className="detail-icon">
                    ◈
                  </span>
                  <div>
                    <span className="detail-label">Company</span>
                    <span>{user.company.name}</span>
                  </div>
                </div>
              </div>
            </article>
          )}
        </section>

        <footer className="card-footer">
          <span>Data provided by JSONPlaceholder</span>
          <span>Redux-managed async state</span>
        </footer>
      </section>
      <p className="page-note">A simple look at the people behind the data.</p>
    </main>
  )
}

export default UserData
