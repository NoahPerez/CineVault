import { Link } from "react-router-dom"
import "./MovieDetailHero.css"
import { useState } from "react"

const imageBaseUrl = "https://image.tmdb.org/t/p/original"

export default function MovieDetailHero({
  movie,
  mediaType = "movie",
  backTo = "/",
  savedEntry,
  onAdd,
  onToggleWatched,
}) {
  const [addState, setAddState] = useState({ movieId: null, status: "idle" })
  const addStatus = addState.movieId === movie?.id ? addState.status : "idle"
  if (!movie) return null

  const title = movie.title || movie.name || "Untitled"
  const releaseDate = movie.release_date || movie.first_air_date || ""
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : "N/A"
  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : null

  const runtimeOrSeasons =
    mediaType === "tv"
      ? movie.number_of_seasons
        ? `${movie.number_of_seasons} seasons`
        : "Seasons N/A"
      : movie.runtime
        ? `${movie.runtime} min`
        : "Runtime N/A"

  const genres = movie.genres?.slice(0, 3).map((genre) => genre.name).join(", ")
  const score = movie.vote_average ? Number(movie.vote_average).toFixed(1) : "N/A"
  const voteCount = movie.vote_count
    ? `${movie.vote_count.toLocaleString()} votes`
    : "Votes N/A"
  const handleAdd = async () => {
    if (!onAdd) return

    try {
      setAddState({ movieId: movie.id, status: "saving" })

      const result = await onAdd(movie)

      setAddState({
        movieId: movie.id,
        status: result?.alreadySaved ? "already-saved" : "saved",
      })
    } catch (error) {
      console.log(error)
      setAddState({ movieId: movie.id, status: "error" })
    }
  }   

  return (
    <section className="movie-detail-hero">
      {backdropUrl && (
        <img
          className="movie-detail-hero__backdrop"
          src={backdropUrl}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="movie-detail-hero__overlay" />

      <div className="movie-detail-hero__inner">
        <Link to={backTo} className="movie-detail-hero__back-link">
          ← Back
        </Link>

        <div className="movie-detail-hero__grid">
          <div className="movie-detail-hero__copy">
            <p className="movie-detail-hero__type">
              {mediaType === "tv" ? "TV Show" : "Movie"}
            </p>

            <h1>{title}</h1>

            <p className="movie-detail-hero__meta">
              {releaseYear}
              <span>•</span>
              {runtimeOrSeasons}
              {genres && (
                <>
                  <span>•</span>
                  {genres}
                </>
              )}
            </p>

            <p className="movie-detail-hero__overview">
              {movie.overview || "No overview available from TMDB yet."}
            </p>

            <div className="movie-detail-hero__actions">
              {savedEntry ? (
                <button
                  type="button"
                  className={
                    savedEntry.watched
                      ? "movie-detail-hero__button movie-detail-hero__button--active"
                      : "movie-detail-hero__button"
                  }
                  onClick={onToggleWatched}
                >
                  {savedEntry.watched ? "Mark Unwatched" : "Mark Watched"}
                </button>
              ) : (
                <button
                  type="button"
                  className="movie-detail-hero__button"
                  disabled={!onAdd || addStatus === "saving"}
                  onClick={handleAdd}>
                  {addStatus === "saving" && "Saving..."}
                  {addStatus === "saved" && "Added"}
                  {addStatus === "already-saved" && "Already Saved"}
                  {addStatus === "error" && "Try Again"}
                  {addStatus === "idle" && "+ Add to Watchlist"}
                </button>
              )}
            </div>
          </div>

          <aside className="movie-detail-hero__score">
            <span>TMDB Rating</span>
            <strong>{score}</strong>
            <p>{voteCount}</p>
            {savedEntry && (
              <em
                className={
                  savedEntry.watched
                    ? "movie-detail-hero__status movie-detail-hero__status--watched"
                    : "movie-detail-hero__status movie-detail-hero__status--unwatched"
                }
              >
                {savedEntry.watched ? "Watched" : "Unwatched"}
              </em>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
