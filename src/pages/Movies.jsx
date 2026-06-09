import { useEffect, useMemo, useState } from "react"
import HeroBanner from "../components/HeroBanner.jsx"
import MovieCarousel from "../components/MovieCarousel.jsx"
import { useMovies } from "../context/Movie.context.jsx"
import { useWatchlist } from "../context/useWatchlist"

export default function Movies() {
  const [heroIndex, setHeroIndex] = useState(0);
  const { addToWatchlist } = useWatchlist();
  const {
    popularMovies,
    upcomingMovies,
    loading,
    error,
    getPopularMovies,
    getUpcomingMovies,
  } = useMovies()

  const heroMovies = useMemo(() => {
    const moviesWithBackdrops = popularMovies.filter((movie) => movie.backdrop_path)
    return moviesWithBackdrops.length > 0 ? moviesWithBackdrops : popularMovies
  }, [popularMovies])

  const featuredMovie = heroMovies[heroIndex % heroMovies.length] || null

  useEffect(() => {
    getPopularMovies()
    getUpcomingMovies()
    // Context fetch functions are not memoized yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (heroMovies.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroMovies.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [heroMovies.length])

  if (loading && !popularMovies.length && !upcomingMovies.length) {
    return <p className="p-12 text-foreground">Loading movies...</p>
  }

  if (error) {
    return <p className="p-12 text-foreground">{error}</p>
  }

  return (
    <>
      <HeroBanner
        movie={featuredMovie}
        featuredMovies={heroMovies.slice(0, 5)}
        activeIndex={heroIndex}
        onSelectFeature={setHeroIndex}
        onAdd={(movie) => addToWatchlist(movie, "movie")}
      />

      <section className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">Popular Movies</h1>
          <MovieCarousel
            movies={popularMovies}
            cardSize="md"
            cardRadius="full"
            showRating={true}
            itemClassName="basis-full sm:basis-1/2 lg:basis-1/5"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">Upcoming Movies</h1>
          <MovieCarousel
            movies={upcomingMovies}
            cardSize="sm"
            cardRadius="full"
            showRating={false}
            itemClassName="basis-full sm:basis-1/2 lg:basis-1/5"
          />
        </div>
      </section>
    </>
  )
}
