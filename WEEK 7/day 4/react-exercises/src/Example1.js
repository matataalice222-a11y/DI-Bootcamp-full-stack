import { Component } from 'react'
import profileData from './profile-data.json'

class Example1 extends Component {
  render() {
    return (
      <section className="parsed-data-card">
        <h3>Social Medias</h3>
        <ul>
          {profileData.SocialMedias.map((url) => (
            <li key={url}>
              <a href={url} rel="noreferrer" target="_blank">{url}</a>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Example1
