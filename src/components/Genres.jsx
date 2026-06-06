// import { useNavigate } from "react-router-dom";
// import { useMovies } from "../context/Movie.context";
// import { useRef } from "react";

// export default function Genres() {
//   const { genres, genreMovies } = useMovies();
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);

// const scrollLeft = () => {
//     scrollRef.current?.scrollBy({
//       left: -300,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({
//       left: 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div
//       ref={scrollRef}
//       style={{
//         position: "relative",
//         display: "flex",
//         gap: "16px",
//         overflowX: "auto",
//         padding: "20px",
//         whiteSpace: "nowrap",
//         scrollBehavior: "smooth",
//   }}
// >
//       {genres.map((genre) => {
//         const moviesForGenre = genreMovies?.[genre.id] || [];
//         const bg = moviesForGenre[0];

//         return (
//           <div
//             key={genre.id}
//             onClick={() => navigate(`/genre/${genre.id}`)}
//             style={{
//               minWidth: "220px",
//               height: "140px",
//               flexShrink: 0,
//               borderRadius: "16px",
//               overflow: "hidden",
//               position: "relative",
//               cursor: "pointer",
//               color: "white",
//             }}
//           >
//             {/* Background Image */}
//             {bg && (
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${bg.poster_path}`}
//                 alt={genre.name}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   filter: "brightness(0.4)",
//                   pointerEvents: "none",
//                 }}
//               />
//             )}

//             {/* Genre Title Overlay */}
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "10px",
//                 left: "10px",
//                 pointerEvents: "none",
//               }}
//             >
//               <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>
//                 {genre.name}
//               </h2>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// 

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
                  
                  {/* BACKGROUND IMAGE */}
                  {bg && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${bg.poster_path}`}
                      alt={genre.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  )}

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/50" />

                  {/* TEXT */}
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