import { useEffect, useState } from 'react'

const carinfo = { name: 'Ford', model: 'Mustang' }

function Garage({ size }) {
  return <p>Who lives in my {size} Garage?</p>
}

function Car({ carInfo }) {
  const [color] = useState('red')

  return (
    <section>
      <h2>This car is {color} {carInfo.model}</h2>
      <Garage size="small" />
    </section>
  )
}

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const clickMe = () => window.alert('I was clicked')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.alert(event.currentTarget.value)
    }
  }

  const toggleButton = () => {
    setIsToggleOn((currentValue) => !currentValue)
  }

  return (
    <section>
      <button onClick={clickMe} type="button">Click me</button>
      <input
        aria-label="Type a message and press Enter"
        onKeyDown={handleKeyDown}
        type="text"
      />
      <button onClick={toggleButton} type="button">
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    </section>
  )
}

function Phone() {
  const [phone, setPhone] = useState({
    brand: 'Samsung',
    model: 'Galaxy S20',
    color: 'black',
    year: 2020,
  })

  const changeColor = () => {
    setPhone((currentPhone) => ({ ...currentPhone, color: 'blue' }))
  }

  return (
    <section>
      <h2>{phone.brand} {phone.model}</h2>
      <p>Color: {phone.color}</p>
      <p>Year: {phone.year}</p>
      <button onClick={changeColor} type="button">Change color</button>
    </section>
  )
}

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red')

  useEffect(() => {
    window.alert('useEffect reached')
  }, [])

  const changeColor = () => setFavoriteColor('blue')

  return (
    <section>
      <h2>My favorite color is {favoriteColor}</h2>
      <button onClick={changeColor} type="button">Change color</button>
    </section>
  )
}

function App() {
  return (
    <main>
      <h1>React Exercises</h1>
      <Car carInfo={carinfo} />
      <Events />
      <Phone />
      <Color />
    </main>
  )
}

export { Car, Color, Events, Garage, Phone }
export default App
