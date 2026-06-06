import { useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieDetailHero from "../components/MovieDetailHero.jsx"
import { useMovies } from "../context/Movie.context"

export default function MovieDetailPage() {
  const { id } = useParams()
  const { selectedmovie, loading, error, getMovieDetails } = useMovies()

  useEffect(() => {
    getMovieDetails(id)
    // getMovieDetails is not memoized in MovieContext yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <MovieDetailHero movie={selectedmovie} mediaType="movie" />
    </main>
  )
}
