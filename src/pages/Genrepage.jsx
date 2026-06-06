
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../context/Movie.context";

export default function GenrePage() {
  const { id } = useParams();
  const { movies, getMoviesByGenre, loading } = useMovies();

  useEffect(() => {
  if (id) {
    getMoviesByGenre(id);
  }
}, [id]);

  if (loading) return <div style={{ color: "white" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        Genre Movies
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
}