import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import MovieCard from "../components/MovieCard.jsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMovies } from "../context/useMovies.jsx"
import "./Search.css"

export default function Search() {
  const [query, setQuery] = useState("")
  const [activeQuery, setActiveQuery] = useState("")
  const [mediaFilter, setMediaFilter] = useState("all")
  const { searchResults, searchMovies, loading, error } = useMovies()

  const searchableResults = useMemo(() => {
    return (searchResults || []).filter((item) => {
      const mediaType = item.media_type || item.mediaType
      return (mediaType === "movie" || mediaType === "tv") && item.poster_path
    })
  }, [searchResults])

  const results = useMemo(() => {
    if (mediaFilter === "all") {
      return searchableResults
    }

    return searchableResults.filter((item) => {
      const mediaType = item.media_type || item.mediaType
      return mediaType === mediaFilter
    })
  }, [searchableResults, mediaFilter])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setActiveQuery("")
      return
    }

    setActiveQuery(trimmedQuery)
    setMediaFilter("all")
    await searchMovies(trimmedQuery)
  }

  return (
    <section className="search-page">
      <div className="search-page__header">
        <p className="search-page__kicker">Discovery</p>
        <h1>Search CineVault</h1>
        <p>Find movies and TV shows from TMDB.</p>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-form__field">
          <SearchIcon className="search-form__icon" size={20} />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie or TV show..."
            className="search-form__input"
          />
        </div>
        <Button type="submit" disabled={loading} className="search-form__button">
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {!activeQuery ? (
        <p className="search-page__state">
          Start by typing a movie or TV show title.
        </p>
      ) : loading ? (
        <p className="search-page__state">
          Searching for "{activeQuery}"...
        </p>
      ) : error ? (
        <p className="search-page__state search-page__state--error">{error}</p>
      ) : !results.length ? (
        <p className="search-page__state">
          No {mediaFilter === "all" ? "movie or TV show" : mediaFilter === "tv" ? "TV show" : "movie"} results found for "{activeQuery}".
        </p>
      ) : (
        <div className="search-results">
          <div className="search-results__header">
            <h2>Results</h2>
            <p>
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="search-results__filters" aria-label="Search result filters">
            {[
              ["all", "All"],
              ["movie", "Movies"],
              ["tv", "TV Shows"],
            ].map(([filterValue, label]) => (
              <button
                key={filterValue}
                type="button"
                className={mediaFilter === filterValue ? "is-active" : ""}
                onClick={() => setMediaFilter(filterValue)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="search-results__grid">
            {results.map((item) => {
              const mediaType = item.media_type || item.mediaType
              const title = item.title || item.name || "Untitled"
              const href = mediaType === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`

              return (
                <Link key={`${mediaType}-${item.id}`} to={href} className="search-result-card">
                  <MovieCard movie={item} size="sm" radius="lg" showRating />
                  <div className="search-result-card__body">
                    <h3>{title}</h3>
                    <p>
                      {mediaType === "tv" ? "TV Show" : "Movie"}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
