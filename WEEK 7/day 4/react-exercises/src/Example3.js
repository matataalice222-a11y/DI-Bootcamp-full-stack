import { Component } from 'react'
import profileData from './profile-data.json'

class Example3 extends Component {
  render() {
    return (
      <section className="parsed-data-card">
        <h3>Experiences</h3>
        {profileData.Experiences.map((experience) => (
          <div key={experience.companyName}>
            <h4>
              <a href={experience.url} rel="noreferrer" target="_blank">
                {experience.companyName}
              </a>
            </h4>
            <img alt="" className="experience-logo" src={experience.logo} />
            {experience.roles.map((role) => (
              <div key={`${experience.companyName}-${role.title}`}>
                <h5>{role.title}</h5>
                <p>{role.description}</p>
                <p>{role.startDate} – {role.endDate}</p>
                <p>{role.location}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    )
  }
}

export default Example3
