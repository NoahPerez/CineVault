import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function EpisodeVideoDialog({
  open,
  onOpenChange,
  episode,
  videos,
  videoLoading = false,
  videoError = null,
}) {
  const results = Array.isArray(videos) ? videos : videos?.results || []

  const activeVideo =
    results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    ) ||
    results.find((video) => video.site === "YouTube") ||
    results[0]

  const embedUrl =
    activeVideo?.site === "YouTube" && activeVideo?.key
      ? `https://www.youtube.com/embed/${activeVideo.key}`
      : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="episode-dialog max-w-4xl">
        <DialogHeader>
          <DialogTitle>{episode?.name || "Episode Video"}</DialogTitle>
          <DialogDescription className="episode-dialog__description">
            {episode?.overview || "Watch the selected episode video."}
          </DialogDescription>
        </DialogHeader>

        {videoLoading ? (
          <p className="episode-dialog__state">Loading video...</p>
        ) : videoError ? (
          <p className="episode-dialog__state episode-dialog__state--error">{videoError}</p>
        ) : embedUrl ? (
          <div className="episode-dialog__frame">
            <iframe
              src={embedUrl}
              title={activeVideo?.name || episode?.name || "Episode video"}
              className="episode-dialog__iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="episode-dialog__state">
            No episode video available.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
