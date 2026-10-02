import { useState } from 'react'

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const clickMe = () => window.alert('I was clicked')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.alert(event.currentTarget.value)
    }
  }

  const toggleButton = () => setIsToggleOn((currentValue) => !currentValue)

  return (
    <div className="component-demo">
      <div className="demo-controls">
        <button className="demo-button" onClick={clickMe} type="button">
          Click me
        </button>
        <input
          aria-label="Press Enter to show the typed text"
          className="demo-input"
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          type="text"
        />
        <button className="demo-button" onClick={toggleButton} type="button">
          {isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  )
}

export default Events