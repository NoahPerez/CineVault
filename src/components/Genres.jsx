
import { useMovies } from "../context/Movie.context";
import { useNavigate } from "react-router-dom";

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
      
      <h2 className="text-white text-xl font-bold mb-4">
        Browse Genres
      </h2>

      <Carousel className="w-full">
        <CarouselContent>

          {genres.map((genre) => {
            const moviesForGenre = genreMovies?.[genre.id] || [];
            const bg = moviesForGenre[0];

            return (
              <CarouselItem
                key={genre.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5"
              >
                <div
                  onClick={() => navigate(`/genre/${genre.id}`)}
                  className="relative h-[160px] rounded-xl overflow-hidden cursor-pointer group"
                >
                  
                  
                  {bg && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${bg.poster_path}`}
                      alt={genre.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  )}

                 
                  <div className="absolute inset-0 bg-black/50" />

                 
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white text-lg font-bold">
                      {genre.name}
                    </h3>
                  </div>

                </div>
              </CarouselItem>
            );
          })}

        </CarouselContent>

        {/* ARROWS */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}