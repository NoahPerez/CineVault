import SeasonSelector from "./SeasonSelector"
import EpisodesList from "./EpisodesList"

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
    <section className="border-y border-white/5 bg-[#0b0b0b] px-6 py-8 md:px-12">
      <div className="flex flex-col gap-8">
        <SeasonSelector
          seasons={seasons}
          selectedSeasonNumber={selectedSeasonNumber}
          onSeasonChange={onSeasonChange}
        />

        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-black uppercase tracking-wide text-foreground">
            Episodes - Season {selectedSeasonNumber}
          </h2>
          <EpisodesList
            episodes={episodes}
            onEpisodePlay={onEpisodePlay}
            seasonLoading={seasonLoading}
            seasonError={seasonError}
          />
        </div>
      </div>
    </section>
  )
}
