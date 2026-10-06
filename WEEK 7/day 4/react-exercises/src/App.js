import { Component, useState } from 'react'
import FormComponent from './FormComponent.js'
import UserFavoriteAnimals from './UserFavoriteAnimals.js'
import Exercise from './Exercise3.js'
import CityCarousel from './CityCarousel.js'
import Car from './Components/Car.js'
import Events from './Components/Events.js'
import Phone from './Components/Phone.js'
import Color from './Components/Color.js'
import ErrorBoundary from './ErrorBoundary.js'
import LifecycleExercises from './LifecycleExercises.js'
import './App.css'

class BuggyCounter extends Component {
  state = { counter: 0 }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }))
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!')
    }

    return (
      <button className="demo-button" onClick={this.handleClick} type="button">
        Click me: {this.state.counter}
      </button>
    )
  }
}

const carinfo = { name: 'Ford', model: 'Mustang' }

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
}

const myelement = <h1>I Love JSX!</h1>
const sum = 5 + 5

function App() {
  const [formData, setFormData] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)

    return {
      firstName: searchParams.get('firstName') ?? '',
      lastName: searchParams.get('lastName') ?? '',
      age: searchParams.get('age') ?? '',
      gender: searchParams.get('gender') ?? '',
      destination: searchParams.get('destination') ?? '',
      lactoseFree: searchParams.has('lactoseFree'),
      vegan: searchParams.has('vegan'),
      kosher: searchParams.has('kosher'),
    }
  })
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  const handleChange = (event) => {
    const input = event.target
    const { name, type, value, checked } = input

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const castVote = (languageName) => {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language) =>
        language.name === languageName
          ? { ...language, votes: language.votes + 1 }
          : language,
      ),
    )
  }

  const totalVotes = languages.reduce((total, language) => total + language.votes, 0)
  const highestVotes = Math.max(...languages.map((language) => language.votes))
  const leadingLanguages = languages.filter(
    (language) => highestVotes > 0 && language.votes === highestVotes,
  )
  const resultMessage =
    leadingLanguages.length === 0
      ? 'No votes yet'
      : leadingLanguages.length > 1
        ? `Tied: ${leadingLanguages.map((language) => language.name).join(', ')}`
        : `${leadingLanguages[0].name} is leading`

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Community poll</p>
        <h1>Language Vote</h1>
        <p>Choose the language you think deserves the top spot.</p>
      </header>

      <FormComponent formData={formData} handleChange={handleChange} />

      <section className="vote-section" aria-labelledby="vote-title">
        <div className="vote-heading">
          <div>
            <h2 id="vote-title">Which language gets your vote?</h2>
            <p>Votes update instantly.</p>
          </div>
          <div className="vote-total" aria-live="polite">
            <strong>{totalVotes}</strong>
            <span>Total votes</span>
          </div>
        </div>

        <ol className="vote-list">
          {languages.map((language) => (
            <li className="vote-row" key={language.name}>
              <div className="vote-language">
                <span className="language-mark" aria-hidden="true">
                  {language.name.slice(0, 2)}
                </span>
                <span className="vote-language-name">{language.name}</span>
              </div>
              <div className="vote-count">
                <strong>{language.votes}</strong>
                <span>{language.votes === 1 ? 'vote' : 'votes'}</span>
              </div>
              <button
                aria-label={`Vote for ${language.name}`}
                className="vote-button"
                onClick={() => castVote(language.name)}
                type="button"
              >
                Vote <span aria-hidden="true">+</span>
              </button>
            </li>
          ))}
        </ol>

        <p className="vote-result" aria-live="polite">{resultMessage}</p>
      </section>

      <section className="exercise-section" aria-labelledby="error-boundary-title">
        <div className="section-heading">
          <span>08</span>
          <h2 id="error-boundary-title">Error boundary simulations</h2>
        </div>
        <div className="lifecycle-grid">
          <article className="lifecycle-card">
            <h3>One boundary for both counters</h3>
            <ErrorBoundary>
              <BuggyCounter />
              <BuggyCounter />
            </ErrorBoundary>
          </article>
          <article className="lifecycle-card">
            <h3>A boundary for each counter</h3>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </article>
          <article className="lifecycle-card">
            <h3>No error boundary</h3>
            <p>Clicking this counter five times crashes the app tree.</p>
            <BuggyCounter />
          </article>
        </div>
      </section>

      <LifecycleExercises />

      <details className="exercise-archive">
        <summary>Previous React exercises</summary>
        <div className="exercise-archive-content">
      <CityCarousel />

      <section className="exercise-section" aria-labelledby="jsx-title">
        <div className="section-heading">
          <span>01</span>
          <h2 id="jsx-title">With JSX</h2>
        </div>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
      </section>

      <section className="exercise-section" aria-labelledby="object-title">
        <div className="section-heading">
          <span>02</span>
          <h2 id="object-title">User object</h2>
        </div>
        <div className="user-name">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
        </div>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>

      <section className="exercise-section" aria-labelledby="tags-title">
        <div className="section-heading">
          <span>03</span>
          <h2 id="tags-title">HTML tags and styling</h2>
        </div>
        <Exercise />
      </section>

      <section className="exercise-section" aria-labelledby="car-title">
        <div className="section-heading">
          <span>04</span>
          <h2 id="car-title">Car and components</h2>
        </div>
        <Car carInfo={carinfo} />
      </section>

      <section className="exercise-section" aria-labelledby="events-title">
        <div className="section-heading">
          <span>05</span>
          <h2 id="events-title">Events</h2>
        </div>
        <Events />
      </section>

      <section className="exercise-section" aria-labelledby="phone-title">
        <div className="section-heading">
          <span>06</span>
          <h2 id="phone-title">Phone</h2>
        </div>
        <Phone />
      </section>

      <section className="exercise-section" aria-labelledby="color-title">
        <div className="section-heading">
          <span>07</span>
          <h2 id="color-title">useEffect</h2>
        </div>
        <Color />
      </section>
        </div>
      </details>
    </main>
  )
}

export default App