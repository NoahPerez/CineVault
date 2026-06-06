import { useEffect, useMemo, useState } from "react"
import HeroBanner from "../components/HeroBanner.jsx"
import MovieCarousel from "../components/MovieCarousel.jsx"
import { useMovies } from "../context/Movie.context.jsx"

export default function TVShows() {
  const [heroIndex, setHeroIndex] = useState(0)
  const { popularTvShows, loading, error, getPopularTvShows } = useMovies()

  const heroShows = useMemo(() => {
    const showsWithBackdrops = popularTvShows.filter((show) => show.backdrop_path)
    return showsWithBackdrops.length > 0 ? showsWithBackdrops : popularTvShows
  }, [popularTvShows])

  const featuredShow = heroShows[heroIndex % heroShows.length] || null

  useEffect(() => {
    getPopularTvShows()
    // getPopularTvShows is not memoized in MovieContext yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (heroShows.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroShows.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [heroShows.length])

  if (loading && !popularTvShows.length) {
    return <p className="p-12 text-foreground">Loading TV shows...</p>
  }

  if (error) {
    return <p className="p-12 text-foreground">{error}</p>
  }

  return (
    <>
      <HeroBanner
        movie={featuredShow}
        featuredMovies={heroShows.slice(0, 5)}
        activeIndex={heroIndex}
        onSelectFeature={setHeroIndex}
      />

      <section className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">Popular TV Shows</h1>
          <MovieCarousel
            movies={popularTvShows}
            cardSize="md"
            cardRadius="full"
            showRating={true}
            itemClassName="basis-full sm:basis-1/2 lg:basis-1/5"
          />
        </div>
      </section>
    </>
  )
}
