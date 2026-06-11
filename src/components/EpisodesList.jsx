import EpisodeCard from "./EpisodeCard"

export default function EpisodesList({
  episodes = [],
  onEpisodePlay,
  seasonLoading = false,
  seasonError = null,
}) {
  if (seasonLoading) {
    return <p className="text-sm text-muted-foreground">Loading episodes...</p>
  }

  if (seasonError) {
    return <p className="text-sm text-destructive">{seasonError}</p>
  }

  if (!episodes.length) {
    return <p className="text-sm text-muted-foreground">No episodes found.</p>
  }

  return (
    <div className="flex flex-col gap-4">
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