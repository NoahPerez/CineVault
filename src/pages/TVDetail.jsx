import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MovieDetailHero from "../components/MovieDetailHero.jsx"
import { useMovies } from "../context/useMovies.jsx"
import { useWatchlist } from "../context/useWatchlist"
import Loading from "../components/Loading.jsx"
import InfoOverview from "../components/InfoOverview.jsx"
import CastCarousel from "../components/CastCarousel.jsx"
import Gallery from "../components/Gallery.jsx"
import ReviewsCarousel from "../components/ReviewsCarousel.jsx"
import Footer from "../components/Footer.jsx"
import SeasonsSection from "../components/SeasonsSection.jsx"
import EpisodeVideoDialog from "../components/EpisodeVideoDialog.jsx"

export default function TVDetail() {
  const { id } = useParams()
  const [requestedId, setRequestedId] = useState(null)
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(null)
  const [isEpisodeDialogOpen, setIsEpisodeDialogOpen] = useState(false)
  const [activeEpisode, setActiveEpisode] = useState(null)
  const {
    selectedTv,
    selectedTvSeasons,
    selectedTvEpisodeVideos,
    loading,
    error,
    seasonLoading,
    seasonError,
    episodeVideoLoading,
    episodeVideoError,
    getTvDetails,
    getTvSeasons,
    getTvEpisodeVideos,
    setSelectedTvEpisodeVideos,
  } = useMovies()
  const isCurrentShow = selectedTv && String(selectedTv.id) === String(id)

  const {
    addToWatchlist,
    findWatchlistEntry,
    updateWatchlistEntry,
    removeFromWatchlist,
    isWatchlistLoading,
  } = useWatchlist()

  const savedEntry = selectedTv
    ? findWatchlistEntry(selectedTv.id, "tv")
    : null

  const handleToggleWatched = async () => {
    if (!savedEntry) return

    await updateWatchlistEntry(savedEntry.id, {
      watched: !savedEntry.watched,
    })
  }

  const handleRemove = async () => {
    if (!savedEntry) return

    await removeFromWatchlist(savedEntry.id)
  }

  useEffect(() => {
    let cancelled = false

    getTvDetails(id).finally(() => {
      if (!cancelled) {
        setRequestedId(id)
      }
    })

    return () => {
      cancelled = true
    }

  }, [id])

  const cast = selectedTv?.credits?.cast
    ?.filter((member) => member.known_for_department === "Acting")
    ?.filter((member) => member.profile_path)
    ?.slice(0, 12) || []

  const reviews = selectedTv?.reviews?.results
    ?.filter((review) => review.content?.trim())
    ?.slice(0, 6) || []

  const seasons = selectedTv?.seasons?.filter((season) => season.season_number > 0) || []
  const effectiveSeasonNumber = seasons.some(
    (season) => season.season_number === selectedSeasonNumber
  )
    ? selectedSeasonNumber
    : (seasons[0]?.season_number ?? null)
  const episodes = selectedTvSeasons?.episodes || []

  useEffect(() => {
    if (!effectiveSeasonNumber) return
    getTvSeasons(id, effectiveSeasonNumber)
  }, [id, effectiveSeasonNumber])

  useEffect(() => {
    setIsEpisodeDialogOpen(false)
    setActiveEpisode(null)
    setSelectedTvEpisodeVideos(null)
  }, [id, effectiveSeasonNumber, setSelectedTvEpisodeVideos])

  const handleEpisodePlay = async (episode) => {
    if (!effectiveSeasonNumber) return
    setActiveEpisode(episode)
    setIsEpisodeDialogOpen(true)
    setSelectedTvEpisodeVideos(null)
    await getTvEpisodeVideos(id, effectiveSeasonNumber, episode.episode_number)
  }

  if ((loading && !selectedTv) || requestedId !== id || isWatchlistLoading) {
    return <Loading message="Loading TV show details..." />
  }

  if (error && !selectedTv) {
    return <p className="movie-detail-page__status">{error}</p>
  }

  if (!isCurrentShow) {
    return <p className="movie-detail-page__status">TV show not found.</p>
  }

  return (
    <main className="movie-detail-page">
      <MovieDetailHero
        movie={selectedTv}
        mediaType="tv"
        backTo="/tv-shows"
        savedEntry={savedEntry}
        onAdd={(show) => addToWatchlist(show, "tv")}
        onToggleWatched={handleToggleWatched}
        onRemove={handleRemove}
      />
      <InfoOverview movie={selectedTv} />
       <SeasonsSection
        seasons={seasons}
        selectedSeasonNumber={effectiveSeasonNumber}
        onSeasonChange={setSelectedSeasonNumber}
        episodes={episodes}
        onEpisodePlay={handleEpisodePlay}
        seasonLoading={seasonLoading}
        seasonError={seasonError}
      />
      <CastCarousel cast={cast} />
      <Gallery movie={selectedTv} />
     
      <ReviewsCarousel reviews={reviews} />
      <EpisodeVideoDialog
        open={isEpisodeDialogOpen}
        onOpenChange={setIsEpisodeDialogOpen}
        episode={activeEpisode}
        videos={selectedTvEpisodeVideos}
        videoLoading={episodeVideoLoading}
        videoError={episodeVideoError}
      />
      <Footer />
    </main>
  )
}
