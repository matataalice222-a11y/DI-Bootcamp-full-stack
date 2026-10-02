import UserFavoriteAnimals from './UserFavoriteAnimals.js'
import Exercise from './Exercise3.js'
import CityCarousel from './CityCarousel.js'
import Car from './Components/Car.js'
import Events from './Components/Events.js'
import Phone from './Components/Phone.js'
import Color from './Components/Color.js'
import './App.css'

const carinfo = { name: 'Ford', model: 'Mustang' }

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
}

const myelement = <h1>I Love JSX!</h1>
const sum = 5 + 5

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">React fundamentals / Week 7</p>
        <h1>Exercises XP</h1>
        <p>JSX, component props, and styling in one small app.</p>
      </header>

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
    </main>
  )
}

export default App