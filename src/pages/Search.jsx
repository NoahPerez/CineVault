import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import MovieCard from "../components/MovieCard.jsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMovies } from "../context/useMovies.jsx"

export default function Search() {
  // query stores what the user is typing right now in the input.
  const [query, setQuery] = useState("")
  // activeQuery stores the last submitted search term.
  const [activeQuery, setActiveQuery] = useState("")
  // These values come from Context API, where the TMDB request is handled.
  const { searchResults, searchMovies, loading, error } = useMovies()

  // TMDB multi-search can return movies, tv shows, and people.
  // We only keep movie and tv results for this page.
  const results = useMemo(() => {
    return (searchResults || []).filter((item) => {
      const mediaType = item.media_type || item.mediaType
      return (mediaType === "movie" || mediaType === "tv") && item.poster_path
    })
  }, [searchResults])

  // When the form is submitted, stop the page refresh and search TMDB.
  const handleSubmit = async (event) => {
    event.preventDefault()
    // trim() removes extra spaces so we do not search for an empty string.
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setActiveQuery("")
      return
    }

    setActiveQuery(trimmedQuery)
    await searchMovies(trimmedQuery)
  }

  return (
    <section className="flex flex-col gap-8 px-6 py-8 md:px-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-black uppercase tracking-wide text-foreground">
          Search
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Search for movies and TV shows from TMDB.
        </p>
      </div>

      {/* Search form UI: input on the left, submit button on the right. */}
      <form onSubmit={handleSubmit} className="flex max-w-2xl gap-3">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie or TV show..."
            className="h-12 border-white/10 bg-[#111111] pl-10 text-foreground"
          />
        </div>
        <Button type="submit" className="h-12 px-6 font-bold">
          Search
        </Button>
      </form>

      {/* Render the correct UI state depending on the search lifecycle. */}
      {!activeQuery ? (
        <p className="text-sm text-muted-foreground">
          Start by typing a movie or TV show title.
        </p>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">
          Searching for “{activeQuery}”...
        </p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : !results.length ? (
        <p className="text-sm text-muted-foreground">
          No movie or TV show results found for “{activeQuery}”.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-black uppercase tracking-wide text-foreground">
              Results
            </h2>
            <p className="text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Results grid: each item links to either a movie detail page or a TV detail page. */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {results.map((item) => {
              const mediaType = item.media_type || item.mediaType
              const title = item.title || item.name || "Untitled"
              const href = mediaType === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`

              return (
                <Link key={`${mediaType}-${item.id}`} to={href} className="flex flex-col gap-3">
                  <MovieCard movie={item} size="sm" radius="lg" showRating />
                  <div className="flex flex-col gap-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
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