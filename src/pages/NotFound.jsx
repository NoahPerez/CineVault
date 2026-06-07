import { Link } from "react-router-dom"
import NotFoundImg from "../assets/NotFound.svg"
import "./NotFound.css"

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__content">
        <img
          className="not-found-page__image"
          src={NotFoundImg}
          alt="Page not found"
        />

        <h1>Page not found</h1>

        <p>The page you are looking for does not exist or has been moved.</p>

        <div className="not-found-page__actions">
          <Link to="/">Back to Home</Link>
          <Link to="/movies">Browse Movies</Link>
        </div>
      </div>
    </main>
  )
}
