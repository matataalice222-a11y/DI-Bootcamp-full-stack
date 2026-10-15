import { useDispatch, useSelector } from 'react-redux'
import { ageDownAsync, ageUpAsync } from '../daily challange.js'

export function AgeDisplay() {
  const { age, loading, error } = useSelector((state) => state.age)

  return (
    <section aria-label="Current age" aria-live="polite" className="age-display">
      <span className="age-caption">YOUR CURRENT AGE</span>
      <div className="age-number-row">
        <span className={`age-number${loading ? ' age-number-loading' : ''}`}>
          {age}
        </span>
        <span className="age-unit">{age === 1 ? 'year old' : 'years old'}</span>
        {loading && (
          <span aria-label="Updating age" className="age-spinner" role="status" />
        )}
      </div>
      <p className="age-helper">
        {loading ? 'Updating your age...' : 'A little change, one year at a time.'}
      </p>
      {error && (
        <p className="age-error" role="alert">
          {error}
        </p>
      )}
    </section>
  )
}

export function AgeControls() {
  const dispatch = useDispatch()
  const { age, loading } = useSelector((state) => state.age)

  return (
    <div aria-label="Age controls" className="age-controls">
      <button
        className="age-button age-down-button"
        disabled={loading || age === 0}
        onClick={() => dispatch(ageDownAsync())}
        type="button"
      >
        <span aria-hidden="true">−</span>
        Age Down
      </button>
      <button
        className="age-button age-up-button"
        disabled={loading}
        onClick={() => dispatch(ageUpAsync())}
        type="button"
      >
        <span aria-hidden="true">+</span>
        Age Up
      </button>
    </div>
  )
}

function AgeTracker() {
  const loading = useSelector((state) => state.age.loading)

  return (
    <main className="age-page">
      <section aria-labelledby="age-title" className="age-card">
        <header className="age-header">
          <span aria-hidden="true" className="age-mark">
            ↗
          </span>
          <span className="age-eyebrow">REDUX TOOLKIT · ASYNC THUNK</span>
          <h1 id="age-title">Age tracker</h1>
          <p>Every year is a new chapter.</p>
        </header>

        <AgeDisplay />
        <AgeControls />

        <footer className="age-footer">
          {loading
            ? 'Hang tight while your age is updated.'
            : 'Age changes are simulated asynchronously.'}
        </footer>
      </section>
      <p className="age-page-note">One moment at a time.</p>
    </main>
  )
}

export default AgeTracker
