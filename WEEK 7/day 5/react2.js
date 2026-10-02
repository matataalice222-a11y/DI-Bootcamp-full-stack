import { useState } from 'react'

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  const addVote = (languageName) => {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language) =>
        language.name === languageName
          ? { ...language, votes: language.votes + 1 }
          : language,
      ),
    )
  }

  return (
    <main>
      <h1>Language Vote</h1>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>
            <span>
              {language.name}: {language.votes} votes
            </span>{' '}
            <button
              aria-label={`Vote for ${language.name}`}
              onClick={() => addVote(language.name)}
              type="button"
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App