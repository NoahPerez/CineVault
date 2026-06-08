import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import watchlistApi from "../api/watchlist";
import {
  buildWatchlistEntry,
  findSavedTitle,
  getMediaType,
  removeSavedTitle,
  replaceSavedTitle,
} from "./watchlistHelpers";

import { WatchlistContext } from "./watchlistStore"

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [watchlistError, setWatchlistError] = useState("");

  const loadWatchlist = useCallback(async () => {
    setIsWatchlistLoading(true);
    setWatchlistError("");

    try {
      const response = await watchlistApi.get("/watchlist");
      setWatchlist(response.data);
    } catch (error) {
      console.log(error);
      setWatchlistError("Start the backend server to load the watchlist.");
    } finally {
      setIsWatchlistLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(loadWatchlist);
  }, [loadWatchlist]);

  const addToWatchlist = useCallback(
    async (item, mediaTypeOverride) => {
      const newEntry = buildWatchlistEntry(item, mediaTypeOverride);
      const existingEntry = findSavedTitle(
        watchlist,
        newEntry.tmdbId,
        newEntry.mediaType
      );

      if (existingEntry) {
        return { entry: existingEntry, alreadySaved: true };
      }

      const response = await watchlistApi.post("/watchlist", newEntry);
      setWatchlist((current) => [...current, response.data]);
      return { entry: response.data, alreadySaved: false };
    },
    [watchlist]
  );

  const updateWatchlistEntry = useCallback(
    async (entryId, updatedFields) => {
      const currentEntry = watchlist.find(
        (item) => String(item.id) === String(entryId)
      );

      if (!currentEntry) {
        throw new Error("Watchlist entry not found.");
      }

      const response = await watchlistApi.put(`/watchlist/${entryId}`, {
        ...currentEntry,
        ...updatedFields,
      });

      setWatchlist((current) => replaceSavedTitle(current, response.data));
      return response.data;
    },
    [watchlist]
  );

  const removeFromWatchlist = useCallback(async (entryId) => {
    await watchlistApi.delete(`/watchlist/${entryId}`);
    setWatchlist((current) => removeSavedTitle(current, entryId));
  }, []);

  const findWatchlistEntry = useCallback(
    (tmdbId, mediaType = "movie") => findSavedTitle(watchlist, tmdbId, mediaType),
    [watchlist]
  );

  const watchlistCounts = useMemo(
    () => ({
      all: watchlist.length,
      movie: watchlist.filter((title) => getMediaType(title) === "movie").length,
      tv: watchlist.filter((title) => getMediaType(title) === "tv").length,
      watched: watchlist.filter((title) => title.watched).length,
      unwatched: watchlist.filter((title) => !title.watched).length,
    }),
    [watchlist]
  );

  const value = useMemo(
    () => ({
      watchlist,
      watchlistCounts,
      isWatchlistLoading,
      watchlistError,
      refreshWatchlist: loadWatchlist,
      addToWatchlist,
      updateWatchlistEntry,
      removeFromWatchlist,
      findWatchlistEntry,
    }),
    [
      addToWatchlist,
      findWatchlistEntry,
      isWatchlistLoading,
      loadWatchlist,
      removeFromWatchlist,
      updateWatchlistEntry,
      watchlist,
      watchlistCounts,
      watchlistError,
    ]
  );

  return (
    <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
  );
}