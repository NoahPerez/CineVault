import ReviewCard from "./ReviewCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ReviewsCarousel({ reviews = [] }) {
  if (!reviews.length) return null

  return (
    <section className="border-y border-white/5 bg-[#040a0d] px-6 py-8 md:px-12">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-black uppercase tracking-wide text-[#f3f3ef]">
            Reviews
          </h2>
          <span className="text-sm font-semibold text-[#d4d8d6]">
            View All <span className="text-yellow-400">›</span>
          </span>
        </div>

        <Carousel opts={{ align: "start", dragFree: true }} className="w-full px-10">
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-[90%] pl-4 md:basis-[48%] xl:basis-[32%]"
              >
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 h-9 w-9 border-yellow-400/25 bg-[#091216] text-yellow-400 hover:bg-[#0f1b20] hover:text-yellow-300" />
          <CarouselNext className="right-2 h-9 w-9 border-yellow-400/25 bg-[#091216] text-yellow-400 hover:bg-[#0f1b20] hover:text-yellow-300" />
        </Carousel>
      </div>
    </section>
  )
}