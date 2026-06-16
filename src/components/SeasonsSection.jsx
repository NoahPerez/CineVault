import SeasonSelector from "./SeasonSelector"
import EpisodesList from "./EpisodesList"
import "./Episodes.css"

export default function SeasonsSection({
  seasons = [],
  selectedSeasonNumber,
  onSeasonChange,
  episodes = [],
  onEpisodePlay,
  seasonLoading = false,
  seasonError = null,
}) {
  if (!seasons.length) return null

  return (
    <section className="episodes-section">
      <div className="episodes-section__inner">
        <div className="episodes-section__header">
          <div>
            <p className="episodes-section__kicker">Episode Guide</p>
            <h2>Season {selectedSeasonNumber}</h2>
          </div>
          <p className="episodes-section__meta">
            {episodes.length} {episodes.length === 1 ? "episode" : "episodes"}
          </p>
        </div>

        <SeasonSelector
          seasons={seasons}
          selectedSeasonNumber={selectedSeasonNumber}
          onSeasonChange={onSeasonChange}
        />

        <EpisodesList
          episodes={episodes}
          onEpisodePlay={onEpisodePlay}
          seasonLoading={seasonLoading}
          seasonError={seasonError}
        />
      </div>
    </section>
  )
}
