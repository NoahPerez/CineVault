import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/Movie.context";
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
    <div className="mt-10 px-4">
      <h2 className="text-white text-xl font-bold mb-4">Browse Genres</h2>

      <Carousel opts={{ align: "start", dragFree: true }} className="w-full px-10">
        <CarouselContent className="-ml-3">
          {genres.map((genre) => {
            const moviesForGenre = genreMovies?.[genre.id] || [];
            const bg = moviesForGenre[0];

            return (
              <CarouselItem
                key={genre.id}
                className="pl-3 basis-[150px] md:basis-[180px] shrink-0"
              >
                <div
                  onClick={() => navigate(`/genre/${genre.id}`)}
                  className="relative w-full h-[180px] rounded-xl overflow-hidden cursor-pointer group"
                  style={{ backgroundColor: "red" }}
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
