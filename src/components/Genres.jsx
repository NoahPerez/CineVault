import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/useMovies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Genres() {
  const { genres, genreMovies } = useMovies();
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <h2 className="mb-5 text-xl font-bold text-white">Browse Genres</h2>

      <Carousel opts={{ align: "center", dragFree: true }} className="mx-auto w-full px-10">
        <CarouselContent className="-ml-3 justify-center">
          {genres.map((genre) => {
            const moviesForGenre = genreMovies?.[genre.id] || [];
            const bg = moviesForGenre[0];

            return (
              <CarouselItem
                key={genre.id}
                className="basis-[132px] shrink-0 pl-3 sm:basis-[150px] md:basis-[165px]"
              >
                <div
                  onClick={() => navigate(`/genre/${genre.id}`)}
                  className="group relative h-[150px] w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800 sm:h-[165px]"
                >
                  {bg?.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${bg.poster_path}`}
                      alt={genre.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800" />
                  )}

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute inset-0 flex items-end p-3">
                    <h3 className="text-white text-sm font-bold drop-shadow">
                      {genre.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-0 bg-black/70 border-white/20 text-white hover:bg-black hover:text-white" />
        <CarouselNext className="right-0 bg-black/70 border-white/20 text-white hover:bg-black hover:text-white" />
      </Carousel>
    </div>
  );
}
