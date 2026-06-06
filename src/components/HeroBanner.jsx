import { Link } from "react-router-dom"
import "./HeroBanner.css"

  const imageBaseUrl = "https://image.tmdb.org/t/p/original"

  export default function HeroBanner({ movie, onAdd }) {
    if (!movie) return null

    const backdropUrl = movie.backdrop_path
      ? `${imageBaseUrl}${movie.backdrop_path}`
      : null

    const releaseYear = movie.release_date
      ? movie.release_date.slice(0, 4)
      : "N/A"

    const rating = movie.vote_average
      ? Number(movie.vote_average).toFixed(1)
      : "N/A"

    return (
      <section className="hero-banner">
        {backdropUrl && (
          <img
            className="hero-banner__backdrop"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="hero-banner__overlay" />

        <div className="hero-banner__content">
          <p className="hero-banner__label">Trending Now</p>

          <h1 className="hero-banner__title">{movie.title}</h1>

          <p className="hero-banner__meta">
            {releaseYear}
            <span>•</span>
            TMDB {rating}
          </p>

          <p className="hero-banner__overview">
            {movie.overview ||
              "Discover movies, save your watchlist, and keep track of what you want to watch next."}
          </p>

          <div className="hero-banner__actions">
            <button type="button" onClick={() => onAdd(movie)}>
              + Add to Watchlist
            </button>

            <Link to={`/movie/${movie.id}`}>More Info</Link>
          </div>
        </div>
      </section>
    )
  }