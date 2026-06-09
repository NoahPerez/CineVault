import MovieCard from "./MovieCard"
import { Link } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function MovieCarousel({
  movies = [],
  cardSize = "md",
  cardRadius = "lg",
  showRating = false,
  itemClassName = "basis-full sm:basis-1/2 lg:basis-1/4",
  mediaType = "movie",
}) {
  if (!movies.length) return null

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
        dragFree: true,
      }}
      className="w-full px-1"
    >
      <CarouselContent className="-ml-4">
        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className={`pl-4 ${itemClassName}`}
          >
            <Link
              to={mediaType === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}
              className="block text-inherit no-underline transition-transform duration-200 hover:-translate-y-1"
            >
              <MovieCard
                movie={movie}
                size={cardSize}
                radius={cardRadius}
                showRating={showRating}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 border-border bg-background/90 backdrop-blur-sm" />
      <CarouselNext className="right-3 border-border bg-background/90 backdrop-blur-sm" />
    </Carousel>
  )
}
