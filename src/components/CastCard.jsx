function CastCard({ castMember }) {
  const imageUrl = castMember.profile_path
    ? `https://image.tmdb.org/t/p/w300${castMember.profile_path}`
    : "https://via.placeholder.com/300x300?text=No+Image"

  return (
    <article className="flex flex-col items-center text-center text-card-foreground">
      <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-[#0c1417] shadow-[0_0_0_3px_rgba(255,255,255,0.03)] md:h-32 md:w-32">
        <img
          src={imageUrl}
          alt={castMember.original_name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-[#f3f3ef] md:text-base">
          {castMember.original_name}
        </h3>
        <p className="line-clamp-1 text-xs text-[#aab2af] md:text-sm">
          {castMember.character || castMember.known_for_department}
        </p>
      </div>
    </article>
  )
}

export default CastCard