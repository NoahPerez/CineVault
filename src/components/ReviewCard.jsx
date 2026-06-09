function getAvatarUrl(authorDetails) {
  const avatarPath = authorDetails?.avatar_path

  if (!avatarPath) return null
  if (avatarPath.startsWith("/https")) return avatarPath.slice(1)
  if (avatarPath.startsWith("http")) return avatarPath

  return `https://image.tmdb.org/t/p/w185${avatarPath}`
}

function formatReviewDate(dateString) {
  if (!dateString) return ""

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString))
}

export default function ReviewCard({ review }) {
  const authorName = review.author_details?.username || review.author || "Anonymous"
  const avatarUrl = getAvatarUrl(review.author_details)
  const rating = review.author_details?.rating ? Math.round(review.author_details.rating / 2) : 0
  const date = formatReviewDate(review.created_at || review.updated_at)
  const initials = authorName.charAt(0).toUpperCase()

  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/8 bg-[#071116] p-6 text-[#f3f3ef] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#101c20] text-sm font-bold text-[#f3f3ef]">
          {avatarUrl ? (
            <img src={avatarUrl} alt={authorName} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-[#f3f3ef]">{authorName}</h3>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={index < rating ? "text-yellow-400" : "text-white/20"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="line-clamp-4 flex-1 text-base leading-7 text-[#c8d0cc]">
        {review.content || "No review content available."}
      </p>

      <p className="mt-8 text-base font-medium text-[#dbe0dd]">{date}</p>
    </article>
  )
}
