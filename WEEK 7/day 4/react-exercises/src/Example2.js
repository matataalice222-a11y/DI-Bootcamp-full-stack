import { Component } from 'react'
import profileData from './profile-data.json'

class Example2 extends Component {
  render() {
    return (
      <section className="parsed-data-card">
        <h3>Skills</h3>
        {profileData.Skills.map((skillArea) => (
          <div key={skillArea.Area}>
            <h4>{skillArea.Area}</h4>
            <ul>
              {skillArea.SkillSet.map((skill) => (
                <li key={skill.Name}>
                  {skill.Name}{skill.Hot ? ' (Hot)' : ''}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    )
  }
}

export default Example2
