import { useEffect } from "react"
import logo from "../assets/logo.svg"
import MovieCard from "../components/MovieCard"
import { useMovies } from "../context/Movie.context"

export default function Homepage() {
  const { movies, loading, error, getPopularMovies } = useMovies()

  useEffect(() => {
    getPopularMovies()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <section style={{ padding: "24px" }}>
      <img
        style={{ width: "150px" }}
        className="logo"
        src={logo}
        alt="CineVault logo"
      />
      <h1 style={{ marginBottom: "20px", fontSize: "2rem", fontWeight: "700" }}>
        Popular Movies
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
