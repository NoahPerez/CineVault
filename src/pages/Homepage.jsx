import { useEffect, useMemo, useState } from "react"
import MovieCarousel from "../components/MovieCarousel"
import Genres from "../components/Genres"
import Footer from "../components/Footer"
import HeroBanner from "../components/HeroBanner.jsx"
import { useMovies } from "../context/Movie.context"

export default function Homepage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const {
    popularMovies,
    upcomingMovies,
    popularTvShows,
    loading,
    error,
    getPopularMovies,
    getUpcomingMovies,
    getPopularTvShows,
    getGenres,
  } = useMovies()

  const heroMovies = useMemo(() => {
    const moviesWithBackdrops = popularMovies.filter((movie) => movie.backdrop_path)
    return moviesWithBackdrops.length > 0 ? moviesWithBackdrops : popularMovies
  }, [popularMovies])

  const featuredMovie = heroMovies[heroIndex % heroMovies.length] || null

  useEffect(() => {
    getPopularMovies()
    getUpcomingMovies()
    getPopularTvShows()
    getGenres()
  }, [])

  useEffect(() => {
    if (heroMovies.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroMovies.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [heroMovies.length])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <HeroBanner
        movie={featuredMovie}
        featuredMovies={heroMovies.slice(0, 5)}
        activeIndex={heroIndex}
        onSelectFeature={setHeroIndex}
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

      <section className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">Popular TV Shows</h1>
          <MovieCarousel
            movies={popularTvShows}
            cardSize="md"
            cardRadius="full"
            showRating={false}
            itemClassName="basis-full sm:basis-1/2 lg:basis-1/5"
          />
        </div>
      </section>

      <section className="p-6">
        <Genres />
      </section>

      <Footer />
    </>
  )
}
