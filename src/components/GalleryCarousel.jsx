import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function GalleryCarousel({ images = [], title = "Media" }) {
  if (!images.length) return null

  return (
    <section className="border-y border-white/5 bg-[#040a0d] px-6 py-8 md:px-12">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-black uppercase tracking-wide text-[#f3f3ef]">
          Gallery
        </h2>

        <Carousel
          opts={{ align: "start", dragFree: true }}
          className="w-full px-8"
        >
          <CarouselContent className="-ml-3">
            {images.map((image, index) => {
              const imageUrl = `https://image.tmdb.org/t/p/w780${image.file_path}`

              return (
                <CarouselItem
                  key={`${image.file_path}-${index}`}
                  className="basis-[85%] pl-3 sm:basis-[60%] lg:basis-[38%] xl:basis-[32%]"
                >
                  <article className="overflow-hidden rounded-lg border border-white/8 bg-[#0a1215]">
                    <img
                      src={imageUrl}
                      alt={`${title} gallery ${index + 1}`}
                      className="aspect-video w-full object-cover"
                    />
                  </article>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious className="left-2 h-9 w-9 border-yellow-400/25 bg-[#091216] text-yellow-400 hover:bg-[#0f1b20] hover:text-yellow-300" />
          <CarouselNext className="right-2 h-9 w-9 border-yellow-400/25 bg-[#091216] text-yellow-400 hover:bg-[#0f1b20] hover:text-yellow-300" />
        </Carousel>
      </div>
    </section>
  )
}

export default GalleryCarousel