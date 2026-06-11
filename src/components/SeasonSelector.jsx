import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-black uppercase tracking-wide text-foreground">
        Seasons
      </h2>

      <Tabs
        value={currentValue}
        onValueChange={(value) => onSeasonChange?.(Number(value))}
      >
        <TabsList
          variant="line"
          className="flex w-fit flex-wrap justify-start gap-3 bg-transparent p-0"
        >
          {availableSeasons.map((season) => (
            <TabsTrigger
              key={season.id ?? season.season_number}
              value={String(season.season_number)}
              className="size-12 flex-none rounded-full border border-white/15 bg-[#111111] px-0 py-0 text-base font-bold text-white transition-colors hover:border-primary/70 hover:bg-[#181818] data-active:border-primary data-active:bg-primary data-active:text-black group-data-[variant=line]/tabs-list:data-active:border-primary group-data-[variant=line]/tabs-list:data-active:bg-primary group-data-[variant=line]/tabs-list:data-active:text-black group-data-[variant=line]/tabs-list:data-active:after:hidden"
            >
              {season.season_number}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}