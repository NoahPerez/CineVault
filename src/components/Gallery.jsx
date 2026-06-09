import GalleryCarousel from "./GalleryCarousel.jsx"

function Gallery({ movie }) {
  const images = movie?.images?.backdrops?.slice(0, 12) || []
  const title = movie?.title || movie?.name || "Media"

  if (!images.length) return null

  return <GalleryCarousel images={images} title={title} />
}

export default Gallery