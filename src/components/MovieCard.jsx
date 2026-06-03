function MovieCard({ movie }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <article
      style={{
        backgroundColor: "#111827",
        color: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        src={imageUrl}
        alt={movie.title}
        style={{ width: "100%", height: "330px", objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>{movie.title}</h3>
        <p style={{ margin: "0 0 10px", color: "#fbbf24", fontWeight: "600" }}>
          Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}
        </p>
        <p style={{ margin: 0, color: "#d1d5db", fontSize: "0.95rem", lineHeight: "1.5" }}>
          {movie.overview || "No description available."}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
