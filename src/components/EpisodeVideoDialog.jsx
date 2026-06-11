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
      <DialogContent className="max-w-4xl bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>{episode?.name || "Episode Video"}</DialogTitle>
          <DialogDescription>
            {episode?.overview || "Watch the selected episode video."}
          </DialogDescription>
        </DialogHeader>

        {videoLoading ? (
          <p className="text-sm text-muted-foreground">Loading video...</p>
        ) : videoError ? (
          <p className="text-sm text-destructive">{videoError}</p>
        ) : embedUrl ? (
          <div className="overflow-hidden rounded-xl border border-white/8">
            <iframe
              src={embedUrl}
              title={activeVideo?.name || episode?.name || "Episode video"}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No episode video available.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}