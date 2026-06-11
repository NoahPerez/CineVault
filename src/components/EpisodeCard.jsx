import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"

export default function EpisodeCard({ episode, onPlay }) {
  const imageUrl = episode?.still_path
    ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
    : "https://via.placeholder.com/640x360?text=No+Image"

  return (
    <article className="grid grid-cols-[72px_1fr_350px] gap-5 rounded-2xl border border-white/10 bg-[#111111] p-4 text-foreground max-md:grid-cols-1">
      <div className="flex min-h-24 items-center justify-center rounded-xl border border-white/10 bg-black/40 px-3 py-4 text-2xl font-black text-primary">
        {episode.episode_number}
      </div>

      <div className="flex justify-center flex-col gap-3">
        <h3 className="text-xl font-semibold text-foreground">{episode.name}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {episode.overview || "No episode overview available."}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <img
          src={imageUrl}
          alt={episode.name}
          className="aspect-video h-full w-full object-cover"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute inset-0 m-auto size-12 rounded-full border-white/20 bg-black/45 text-white hover:bg-black/60"
          onClick={() => onPlay?.(episode)}
        >
          <PlayIcon />
          <span className="sr-only">Play episode video</span>
        </Button>
      </div>
    </article>
  )
}