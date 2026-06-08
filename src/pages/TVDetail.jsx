import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MovieDetailHero from "../components/MovieDetailHero.jsx"
import { useMovies } from "../context/Movie.context.jsx"
import { useWatchlist } from "../context/WatchlistContext"
import Loading from "../components/Loading.jsx"

export default function TVDetail() {
  const { id } = useParams()
  const [requestedId, setRequestedId] = useState(null)
  const { selectedTv, loading, error, getTvDetails } = useMovies()
  const isCurrentShow = selectedTv && String(selectedTv.id) === String(id)

  const {
    addToWatchlist,
    findWatchlistEntry,
    updateWatchlistEntry,
    removeFromWatchlist,
    isWatchlistLoading,
  } = useWatchlist()

  const savedEntry = selectedTv
    ? findWatchlistEntry(selectedTv.id, "tv")
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
    let cancelled = false

    getTvDetails(id).finally(() => {
      if (!cancelled) {
        setRequestedId(id)
      }
    })

    return () => {
      cancelled = true
    }

  }, [id])

  if (loading || requestedId !== id || isWatchlistLoading) {
    return <Loading message="Loading TV show details..." />
  }

  if (error) {
    return <p className="movie-detail-page__status">{error}</p>
  }

  if (!isCurrentShow) {
    return <p className="movie-detail-page__status">TV show not found.</p>
  }

  return (
    <main className="movie-detail-page">
      <MovieDetailHero
        movie={selectedTv}
        mediaType="tv"
        backTo="/tv-shows"
        savedEntry={savedEntry}
        onAdd={(show) => addToWatchlist(show, "tv")}
        onToggleWatched={handleToggleWatched}
        onRemove={handleRemove}
      />
    </main>
  )
}
