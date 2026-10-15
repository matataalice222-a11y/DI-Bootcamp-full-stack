import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ageStore } from '../daily challange.js'
import AgeTracker from './AgeTracker.jsx'
import './age-tracker.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ageStore}>
      <AgeTracker />
    </Provider>
  </StrictMode>,
)
