import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/useWatchlist"
import { getMediaType } from "../context/watchlistHelpers";
import { Link } from "react-router-dom";
import "./Watchlist.css";

function WatchlistPage() {
  const [filter, setFilter] = useState("all");
  const {
    watchlist,
    watchlistCounts,
    isWatchlistLoading,
    watchlistError,
  } = useWatchlist();

  const filteredTitles = watchlist.filter((title) => {
    if (filter === "movie" || filter === "tv") return getMediaType(title) === filter;
    if (filter === "watched") return title.watched;
    if (filter === "unwatched") return !title.watched;
    return true;
  });

  const mediaTabs = [
    ["all", "All"],
    ["movie", "Movies"],
    ["tv", "TV Shows"],
  ];

  const statusTabs = [
    ["watched", "Watched"],
    ["unwatched", "Unwatched"],
  ];

  if (isWatchlistLoading) {
    return <p className="page-state">Loading watchlist...</p>;
  }

  return (
    <div className="watchlist-page">
      <section className="watchlist-heading">
        <div>
          <p className="watchlist-kicker">Saved Library</p>
          <h1>My Watchlist</h1>
          <p>{watchlist.length} saved titles</p>
        </div>

        <div className="watchlist-stats">
          <div>
            <strong>{watchlistCounts.unwatched}</strong>
            <span>Unwatched</span>
          </div>
          <div>
            <strong>{watchlistCounts.watched}</strong>
            <span>Watched</span>
          </div>
        </div>
      </section>

      <div className="filter-tabs">
        <div className="filter-tabs__group" aria-label="Media filters">
          {mediaTabs.map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              className={filter === tab ? "active" : ""}
              onClick={() => setFilter(tab)}
            >
              {label} ({watchlistCounts[tab]})
            </button>
          ))}
        </div>

        <div className="filter-tabs__group filter-tabs__group--status" aria-label="Watch status filters">
          {statusTabs.map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              className={filter === tab ? "active" : ""}
              onClick={() => setFilter(tab)}
            >
              {label} ({watchlistCounts[tab]})
            </button>
          ))}
        </div>
      </div>

      {watchlistError && <p className="page-state error">{watchlistError}</p>}

      {!watchlistError && filteredTitles.length === 0 ? (
        <p className="page-state">
          {filter === "all" ? "Your watchlist is empty." : `No ${filter} titles yet.`}
        </p>
      ) : (
        <section className="watchlist-grid">
          {filteredTitles.map((title) => {
            const mediaType = getMediaType(title);
            const detailPath =
              mediaType === "tv" ? `/tv/${title.tmdbId}` : `/movie/${title.tmdbId}`;

            return (
              <Link
                key={`${mediaType}-${title.id}`}
                to={detailPath}
                className="watchlist-card-link"
              >
                <MovieCard movie={title} />
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default WatchlistPage;
