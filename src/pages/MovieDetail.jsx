import { useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieDetailHero from "../components/MovieDetailHero.jsx"
import { useMovies } from "../context/Movie.context"
import { useWatchlist } from "../context/useWatchlist"
import Loading from "../components/Loading.jsx"

export default function MovieDetailPage() {
  const { id } = useParams()
  const { selectedmovie, loading, error, getMovieDetails } = useMovies()
  
  const {
    addToWatchlist,
    findWatchlistEntry,
    updateWatchlistEntry,
    removeFromWatchlist,
    isWatchlistLoading,
  } = useWatchlist()

  const savedEntry = selectedmovie
    ? findWatchlistEntry(selectedmovie.id, "movie")
    : null

  const handleToggleWatched = async () => {
    if (!savedEntry) return

    await updateWatchlistEntry(savedEntry.id, {
      watched: !savedEntry.watched,
    })
  }

  const handleRemove = async () => {
    if (!savedEntry) return

    await removeFromWatchlist(savedEntry.id)
  }

  useEffect(() => {
    getMovieDetails(id)
  }, [id])

  if ((loading && !selectedmovie) || isWatchlistLoading) {
    return <Loading message="Loading movie details..." />
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
        onRemove={handleRemove}
      />
    </main>
  )
}
