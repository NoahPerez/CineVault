import EpisodeCard from "./EpisodeCard"

export default function EpisodesList({
  episodes = [],
  onEpisodePlay,
  seasonLoading = false,
  seasonError = null,
}) {
  if (seasonLoading) {
    return <p className="episodes-list__state">Loading episodes...</p>
  }

  if (seasonError) {
    return <p className="episodes-list__state episodes-list__state--error">{seasonError}</p>
  }

  if (!episodes.length) {
    return <p className="episodes-list__state">No episodes found.</p>
  }

  return (
    <div className="episodes-list">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id ?? episode.episode_number}
          episode={episode}
          onPlay={onEpisodePlay}
        />
      ))}
    </div>
  )
}
