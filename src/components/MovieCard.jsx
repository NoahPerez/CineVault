import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const sizeClasses = {
  sm: { image: "aspect-[2/3]", title: "text-base", body: "p-3", overview: "line-clamp-2 text-xs leading-5" },
  md: { image: "aspect-[2/3]", title: "text-lg", body: "p-4", overview: "line-clamp-3 text-sm leading-6" },
  lg: { image: "aspect-[2/3]", title: "text-xl", body: "p-5", overview: "line-clamp-4 text-base leading-7" },
}

const radiusClasses = {
  none: "rounded-none",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-3xl",
}

function MovieCard({ movie, size = "md", radius = "lg", showRating = false }) {
  if (!movie) return null

  const title = movie.title || movie.name || "Untitled"
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"

  const selectedSize = sizeClasses[size] ?? sizeClasses.md
  const selectedRadius = radiusClasses[radius] ?? radiusClasses.lg

  return (
    <article className={cn("relative overflow-hidden bg-card text-card-foreground shadow-lg", selectedRadius)}>
      {showRating && (
        <Badge className="absolute left-2 top-2 z-10 rounded-md border border-yellow-500/20 bg-black/90 px-2.5 py-1 text-xs font-bold text-yellow-300 shadow-sm">
          {movie.vote_average?.toFixed(1) ?? "N/A"}
        </Badge>
      )}
      <img
        src={imageUrl}
        alt={title}
        className={cn("block w-full object-cover", selectedSize.image)}
        loading="lazy"
      />
    </article>
  )
}

export default MovieCard
