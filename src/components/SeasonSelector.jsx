export default function SeasonSelector({
  seasons = [],
  selectedSeasonNumber,
  onSeasonChange,
}) {
  const availableSeasons = seasons.filter((season) => season.season_number > 0)

  if (!availableSeasons.length) return null

  const currentValue = String(
    selectedSeasonNumber ?? availableSeasons[0].season_number
  )

  return (
    <div className="season-selector">
      <div className="season-selector__top">
        <div>
          <p className="season-selector__kicker">Browse Seasons</p>
          <h3 className="season-selector__title">Choose a season</h3>
        </div>
        <span className="season-selector__count">
          {availableSeasons.length} seasons
        </span>
      </div>

      <div className="season-selector__list" role="tablist" aria-label="TV seasons">
        {availableSeasons.map((season) => {
          const value = String(season.season_number)

          return (
            <button
              key={season.id ?? season.season_number}
              type="button"
              className={
                value === currentValue
                  ? "season-selector__button is-active"
                  : "season-selector__button"
              }
              aria-selected={value === currentValue}
              role="tab"
              onClick={() => onSeasonChange?.(Number(value))}
            >
              {season.season_number}
            </button>
          )
        })}
      </div>
    </div>
  )
}
