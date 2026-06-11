import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMovies } from "../context/useMovies.jsx"

export default function GenrePage() {
  const { id } = useParams()
  const { genreMovies, getMoviesByGenre, loading } = useMovies()

  useEffect(() => {
    if (id) {
      getMoviesByGenre(Number(id))
    }
  }, [id])

  const movies = genreMovies?.[Number(id)] || []

  if (loading) return <div className="text-white p-4">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-bold mb-6">
        Genre Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="rounded-lg"
              alt={movie.title}
            />
          ))
        ) : (
          <p className="text-white">No movies found</p>
        )}
      </div>
    </div>
  )
}