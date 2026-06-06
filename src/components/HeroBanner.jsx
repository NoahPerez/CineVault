import { Link } from "react-router-dom"
import "./HeroBanner.css"

const imageBaseUrl = "https://image.tmdb.org/t/p/original"

export default function HeroBanner({
  movie,
  onAdd,
  featuredMovies = [],
  activeIndex = 0,
  onSelectFeature,
}) {
  if (!movie) return null

  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : null

  const title = movie.title || movie.name || "Untitled"
  const releaseDate = movie.release_date || movie.first_air_date || ""
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : "N/A"
  const isTvShow = Boolean(movie.name && !movie.title)
  const mediaLabel = isTvShow ? "TV Show" : "Movie"
  const detailPath = isTvShow ? `/tv/${movie.id}` : `/movie/${movie.id}`
  const snapshotText = isTvShow
    ? "Popular TV shows in rotation"
    : "Popular movies in rotation"

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

      <div className="hero-banner__layout">
        <div className="hero-banner__content">
          <p className="hero-banner__label">Trending Now</p>

          <h1 className="hero-banner__title">{title}</h1>

          <p className="hero-banner__meta">
            {releaseYear}
            <span>•</span>
            {mediaLabel}
            <span>•</span>
            TMDB {rating}
          </p>

          <p className="hero-banner__overview">
            {movie.overview ||
              "Discover movies, save your watchlist, and keep track of what you want to watch next."}
          </p>

          <div className="hero-banner__actions">
            <button type="button" disabled={!onAdd} onClick={() => onAdd?.(movie)}>
              + Add to Watchlist
            </button>

            <Link to={detailPath}>More Info</Link>
          </div>

          {featuredMovies.length > 1 && (
            <div className="hero-banner__dots" aria-label="Featured movies">
              {featuredMovies.map((featuredMovie, index) => {
                const featuredTitle =
                  featuredMovie.title || featuredMovie.name || "featured title"

                return (
                  <button
                    key={featuredMovie.id}
                    type="button"
                    className={
                      activeIndex % featuredMovies.length === index ? "active" : ""
                    }
                    aria-label={`Show ${featuredTitle}`}
                    onClick={() => onSelectFeature?.(index)}
                  />
                )
              })}
            </div>
          )}
        </div>

        <aside className="hero-banner__snapshot">
          <span className="hero-banner__snapshot-label">Featured</span>
          <strong>{featuredMovies.length}</strong>
          <p>{snapshotText}</p>
          <Link to="/watchlist" className="hero-banner__snapshot-link">
            Open Watchlist <span>→</span>
          </Link>
        </aside>
      </div>
    </section>
  )
}
