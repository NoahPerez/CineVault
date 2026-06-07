import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Bookmark } from "lucide-react"
import Footer from "../components/Footer"
import Genres from "../components/Genres"
import MovieCarousel from "../components/MovieCarousel"
import { useMovies } from "../context/Movie.context"
import "./Homepage.css"

const imageBaseUrl = "https://image.tmdb.org/t/p/original"

export default function Homepage() {
  const [backdropIndex, setBackdropIndex] = useState(0)
  const {
    popularMovies,
    popularTvShows,
    loading,
    error,
    getPopularMovies,
    getPopularTvShows,
    getGenres,
  } = useMovies()

  const backdropMovies = useMemo(() => {
    return popularMovies.filter((movie) => movie.backdrop_path).slice(0, 8)
  }, [popularMovies])

  const backdropMovie = backdropMovies[backdropIndex % backdropMovies.length] || null
  const backdropUrl = backdropMovie?.backdrop_path
    ? `${imageBaseUrl}${backdropMovie.backdrop_path}`
    : null

  useEffect(() => {
    getPopularMovies()
    getPopularTvShows()
    getGenres()
    // Context fetch functions are not memoized yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (backdropMovies.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setBackdropIndex((currentIndex) => (currentIndex + 1) % backdropMovies.length)
    }, 9000)

    return () => window.clearInterval(intervalId)
  }, [backdropMovies.length])

  if (loading && !popularMovies.length && !popularTvShows.length) {
    return <div className="home-page__status">Loading...</div>
  }

  if (error) {
    return <div className="home-page__status">Error: {error}</div>
  }

  return (
    <>
      <section className="home-hero">
        {backdropUrl && (
          <img
            key={backdropMovie.id}
            className="home-hero__backdrop"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="home-hero__overlay" />

        <div className="home-hero__inner">
          <div className="home-hero__content">
            <p className="home-hero__label">CineVault</p>
            <h1>Find your next watch.</h1>
            <p className="home-hero__copy">
              Explore movies, TV shows, and genre collections in one place.
            </p>

            <div className="home-hero__actions">
              <Link to="/movies">Explore Movies</Link>
              <Link to="/tv-shows">Explore TV Shows</Link>
            </div>
          </div>

          <div className="home-hero__watchlist" aria-label="Watchlist shortcut">
            <div className="home-hero__watchlist-icon">
              <Bookmark size={22} aria-hidden="true" />
            </div>
            <p className="home-hero__watchlist-label">Watchlist</p>
            <h2>Your saved picks live here.</h2>
            <p>
              Keep movies and TV shows you want to come back to later in one
              focused list.
            </p>
            <Link to="/watchlist">Open Watchlist</Link>
            <span>Start building your queue.</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__header">
          <h2>Movie Picks</h2>
          <Link to="/movies">View all</Link>
        </div>
        <MovieCarousel
          movies={popularMovies.slice(0, 10)}
          cardSize="sm"
          cardRadius="full"
          showRating={true}
          itemClassName="basis-1/2 sm:basis-1/3 lg:basis-1/6"
        />
      </section>

      <section className="home-section">
        <div className="home-section__header">
          <h2>TV Picks</h2>
          <Link to="/tv-shows">View all</Link>
        </div>
        <MovieCarousel
          movies={popularTvShows.slice(0, 10)}
          cardSize="sm"
          cardRadius="full"
          showRating={true}
          itemClassName="basis-1/2 sm:basis-1/3 lg:basis-1/6"
        />
      </section>

      <section className="home-section" id="home-genres">
        <Genres />
      </section>

      <Footer />
    </>
  )
}
