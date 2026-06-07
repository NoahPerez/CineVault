import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { MovieProvider } from "./context/Movie.context.jsx"
import { WatchlistProvider } from "./context/WatchlistContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider>
       <WatchlistProvider>
        <App />
        </WatchlistProvider>
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>,
)
