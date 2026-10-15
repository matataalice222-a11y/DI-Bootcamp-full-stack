import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '../daily challange.js'
import PlannerApp from './PlannerApp.jsx'
import './planner.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PlannerApp />
    </Provider>
  </StrictMode>,
)
