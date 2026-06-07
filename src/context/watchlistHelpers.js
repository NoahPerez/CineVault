export function getMediaType(item, fallback = "movie") {
  return item?.mediaType || item?.media_type || fallback;
}

export function getTitle(item) {
  return item?.title || item?.name || "Untitled";
}

export function getReleaseDate(item) {
  return item?.release_date || item?.first_air_date || "";
}

export function findSavedTitle(watchlist, tmdbId, mediaType = "movie") {
  const normalizedMediaType = mediaType === "tv" ? "tv" : "movie";

  return (
    watchlist.find(
      (item) =>
        String(item.tmdbId) === String(tmdbId) &&
        getMediaType(item) === normalizedMediaType
    ) || null
  );
}

export function buildWatchlistEntry(item, mediaTypeOverride) {
  return {
    mediaType: getMediaType(item, mediaTypeOverride),
    tmdbId: item.id,
    title: getTitle(item),
    overview: item.overview,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    release_date: getReleaseDate(item),
    vote_average: item.vote_average,
    watched: false,
    userRating: null,
    userNotes: "",
    addedAt: new Date().toISOString().split("T")[0],
  };
}

export function replaceSavedTitle(watchlist, updatedEntry) {
  return watchlist.map((item) =>
    String(item.id) === String(updatedEntry.id) ? updatedEntry : item
  );
}

export function removeSavedTitle(watchlist, entryId) {
  return watchlist.filter((item) => String(item.id) !== String(entryId));
}