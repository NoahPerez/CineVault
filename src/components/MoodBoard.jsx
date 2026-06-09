// import {useMovies} from "../context/Movie.context"
// import { useNavigate } from "react-router-dom"

// const Moods = [
//     { mood: "Feeling Adventurous", genre: "Action" },
//   { mood: "Need a Laugh", genre: "Comedy" },
//   { mood: "Want to Think", genre: "Drama" },
//   { mood: "Feeling Brave", genre: "Horror" },
//   { mood: "Mind = Blown", genre: "Science Fiction" },
//   { mood: "Edge of Seat", genre: "Thriller" }
// ]

// export default function MoodBoard() {
//     const { genres, genreMovies} = useMovies()
//     const navigate = useNavigate()


//     return (
//        <section className="mb-8">
//       <h2 className="text-lg font-bold mb-4 tracking-wide text-[#dfff00]">LIGHTS, CAMERA, MOOD</h2>

//       <div className="grid grid-cols-2 gap-3">
//         {Moods.map(({ mood, genre, emoji }) => {

//           const genreObj = genres.find((g) => g.name === genre)

//           const bgMovie = genreObj ? genreMovies?.[genreObj.id]?.[0] : null

//           return (
//             <div 
//               key={mood}
//               onClick={() => genreObj && navigate(`/genre/${genreObj.id}`)}
//               className="relative h-[100px] rounded-xl overflow-hidden cursor-pointer group"
//             >
              
//               {bgMovie?.poster_path && (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${bgMovie.poster_path}`}
//                   alt={genre}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
//                 />
//               )}

              
//               <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

              
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className="text-xl">{emoji}</span>
//                 <p className="text-white text-xs font-bold text-center px-2 mt-1">{mood}</p>
//                 <p className="text-gray-300 text-[10px]">{genre}</p>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </section> 
//     )
// }

import { useMovies } from "../context/Movie.context"
import { useNavigate } from "react-router-dom"

// TODO: mood labels are hardcoded — genre data is real from TMDB API
const MOODS = [
  { mood: "Feeling Adventurous", genre: "Action" },
  { mood: "Need a Laugh", genre: "Comedy" },
  { mood: "Want to Think", genre: "Drama" },
  { mood: "Feeling Brave", genre: "Horror" },
  { mood: "Mind = Blown", genre: "Science Fiction" },
  { mood: "Edge of Seat", genre: "Thriller" },
]

export default function MoodBoard() {
  const { genres, genreMovies } = useMovies()
  const navigate = useNavigate()

  return (
    <section className="mb-8">

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-black uppercase tracking-widest text-[white]">
          {/* Lights, Camera, Mood */} MOOD BOARD
        </h2>
        <div className="flex-1 h-[1px] bg-[#dfff00]/30 ml-2" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MOODS.map(({ mood, genre }) => {

          const genreObj = genres.find((g) => g.name === genre)
          const bgMovie = genreObj ? genreMovies?.[genreObj.id]?.[0] : null

          return (
            <div
              key={mood}
              onClick={() => genreObj && navigate(`/genre/${genreObj.id}`)}
              className="relative h-[100px] rounded-xl overflow-hidden cursor-pointer group"
            >
              {bgMovie?.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${bgMovie.poster_path}`}
                  alt={genre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              )}

              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-white text-xs font-bold text-center px-2">{mood}</p>
                <p className="text-white text-[10px] uppercase tracking-wide mt-1">{genre}</p>
              </div>

              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#dfff00] transition duration-300" />

            </div>
          )
        })}
      </div>
    </section>
  )
}