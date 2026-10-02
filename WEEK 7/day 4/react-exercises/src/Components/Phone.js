import { useState } from 'react'

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
    <div className="component-demo">
      <p>Brand: {phone.brand}</p>
      <p>Model: {phone.model}</p>
      <p>Color: {phone.color}</p>
      <p>Year: {phone.year}</p>
      <div className="demo-controls">
        <button className="demo-button" onClick={changeColor} type="button">
          Change color
        </button>
      </div>
    </div>
  )
}

export default Phone