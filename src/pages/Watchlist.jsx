import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";
import { getMediaType } from "../context/watchlistHelpers";
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

  const tabs = [
    ["all", "All"],
    ["movie", "Movies"],
    ["tv", "TV Shows"],
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
        {tabs.map(([tab, label]) => (
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

      {watchlistError && <p className="page-state error">{watchlistError}</p>}

      {!watchlistError && filteredTitles.length === 0 ? (
        <p className="page-state">
          {filter === "all" ? "Your watchlist is empty." : `No ${filter} titles yet.`}
        </p>
      ) : (
        <section className="watchlist-grid">
          {filteredTitles.map((title) => (
            <MovieCard key={`${getMediaType(title)}-${title.id}`} movie={title} />
          ))}
        </section>
      )}
    </div>
  );
}

export default WatchlistPage;
