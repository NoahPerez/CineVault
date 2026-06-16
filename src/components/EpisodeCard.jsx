import { PlayIcon } from "lucide-react"

export default function EpisodeCard({ episode, onPlay }) {
  const imageUrl = episode?.still_path
    ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
    : "https://via.placeholder.com/640x360?text=No+Image"
  const airDate = episode?.air_date || "Air date N/A"
  const rating = episode?.vote_average
    ? Number(episode.vote_average).toFixed(1)
    : "N/A"

  return (
    <article className="episode-card">
      <div className="episode-card__media">
        <img
          src={imageUrl}
          alt={episode.name}
          className="episode-card__image"
        />
        <span className="episode-card__number">
          EP {episode.episode_number}
        </span>
        <button
          type="button"
          className="episode-card__play"
          onClick={() => onPlay?.(episode)}
        >
          <PlayIcon size={20} />
          <span className="sr-only">Play episode video</span>
        </button>
      </div>

      <div className="episode-card__content">
        <div className="episode-card__meta">
          <span>{airDate}</span>
          <span>TMDB {rating}</span>
        </div>

        <h3 className="episode-card__title">{episode.name}</h3>
        <p className="episode-card__overview">
          {episode.overview || "No episode overview available."}
        </p>
      </div>
    </article>
  )
}
