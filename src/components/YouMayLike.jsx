import { Link } from "react-router-dom"
import "./YouMayLike.css"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

export default function YouMayLike({
    recommendations = [],
    isLoading = false,
    error = null,
  }) {
    if (isLoading) {
      return <p className="you-may-like__state">Loading recommendations...</p>
    }

    if (error) {
      return <p className="you-may-like__state">Could not load recommendations.</p>
    }

    if (!recommendations.length) {
      return null
    }

    return (
      <section className="you-may-like">
        <div className="you-may-like__header">
          <div>
            <p className="you-may-like__kicker">Personal Picks</p>
            <h2>You May Like</h2>
          </div>
        </div>

        <div className="you-may-like__grid">
          {recommendations.map((item) => {
            const title = item.title || item.name || "Untitled"
            const detailPath =
              item.mediaType === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`

            const imageUrl = item.poster_path
              ? `${imageBaseUrl}${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"

            return (
              <Link
                key={`${item.mediaType}-${item.id}`}
                to={detailPath}
                className="you-may-like__card"
              >
                <img src={imageUrl} alt={title} />
                <div>
                  <span>{item.mediaType === "tv" ? "TV Show" : "Movie"}</span>
                  <h3>{title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    )
  }