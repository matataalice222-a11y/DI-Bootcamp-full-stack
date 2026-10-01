import { Component } from 'react'
import './Exercise.css'

const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial',
}

class Exercise extends Component {
  render() {
    return (
      <div className="tag-exercise">
        <h1 style={style_header}>This is a header</h1>
        <p className="para">This is a paragraph.</p>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          This is a link
        </a>
        <form className="sample-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" placeholder="Enter your name" />
          <button type="submit">Submit</button>
        </form>
        <img
          className="sample-image"
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
          alt="Sunlit mountain landscape"
        />
        <ul className="tag-list">
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    )
  }
}

export default Exercise