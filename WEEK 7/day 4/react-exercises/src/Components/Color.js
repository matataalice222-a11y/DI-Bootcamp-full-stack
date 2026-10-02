import { useEffect, useState } from 'react'

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red')

  useEffect(() => {
    window.alert('useEffect reached')
  }, [])

  const changeColor = () => setFavoriteColor('blue')

  return (
    <div className="component-demo">
      <h3>My favorite color is {favoriteColor}</h3>
      <div className="demo-controls">
        <button className="demo-button" onClick={changeColor} type="button">
          Change color
        </button>
      </div>
    </div>
  )
}

export default Color