import { useEffect } from "react"
import MovieCarousel from "../components/MovieCarousel"
import { useMovies } from "../context/Movie.context"

export default function Homepage() {
  const {
    popularMovies,
    upcomingMovies,
    popularTvShows,
    loading,
    error,
    getPopularMovies,
    getUpcomingMovies,
    getPopularTvShows,
    movieGenre,
    getMovieGenre,
  } = useMovies()

  useEffect(() => {
    getPopularMovies()
    getUpcomingMovies()
    getPopularTvShows()
    getMovieGenre()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <>
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
    {/* <section className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-foreground">Movie Genres</h1>
        <MovieCarousel
          movies={movieGenre}
          cardSize="sm"
          cardRadius="full"
          showRating={false}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/5"
        />
      </div>
    </section> */}

    </>
  )
}
