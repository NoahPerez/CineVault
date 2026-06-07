import { useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieDetailHero from "../components/MovieDetailHero.jsx"
import { useMovies } from "../context/Movie.context"
import { useWatchlist } from "../context/WatchlistContext"

export default function MovieDetailPage() {
  const { id } = useParams()
  const { selectedmovie, loading, error, getMovieDetails } = useMovies()
  
  const { addToWatchlist, findWatchlistEntry, updateWatchlistEntry } = useWatchlist()

  const savedEntry = selectedmovie
    ? findWatchlistEntry(selectedmovie.id, "movie")
    : null

  const handleToggleWatched = () => {
    if (!savedEntry) return

    updateWatchlistEntry(savedEntry.id, {
      watched: !savedEntry.watched,
    })
  }

  useEffect(() => {
    getMovieDetails(id)
  }, [id])

  if (loading && !selectedmovie) {
    return <p className="movie-detail-page__status">Loading movie details...</p>
  }

  if (error) {
    return <p className="movie-detail-page__status">{error}</p>
  }

  if (!selectedmovie || String(selectedmovie.id) !== String(id)) {
    return <p className="movie-detail-page__status">Movie not found.</p>
  }

  return (
    <main className="movie-detail-page">
      <MovieDetailHero
    movie={selectedmovie}
    mediaType="movie"
    backTo="/movies"
    savedEntry={savedEntry}
    onAdd={(movie) => addToWatchlist(movie, "movie")}
    onToggleWatched={handleToggleWatched}
      />
    </main>
  )
}
