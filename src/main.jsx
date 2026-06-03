import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom"
import { MovieProvider } from "./context/Movie.context.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <MovieProvider>
        <App />
      </MovieProvider>
    </Router>
  </StrictMode>,
)
