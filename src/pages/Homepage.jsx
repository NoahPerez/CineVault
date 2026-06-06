import { useEffect } from "react"
import logo from "../assets/logo.svg"
import MovieCard from "../components/MovieCard"
import { useMovies } from "../context/Movie.context"
import Genres from "../components/Genres"
import Footer from "../components/Footer";


export default function Homepage() {
  const { movies, loading, error, getPopularMovies, getGenres, fetchMoviesForAllGenres, genres } = useMovies()

   console.log("MOVIES:", movies);
  

  useEffect(() => {
  getPopularMovies();
  getGenres();  
}, []);

useEffect(() => {
  if (genres.length > 0) {
    fetchMoviesForAllGenres(genres);
  }
}, [genres])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    
    <section style={{ padding: "24px" }}>
      <img
        style={{ width: "150px" }}
        className="logo"
        src={logo}
         alt="CineVault logo"
      />
      <h1 style={{ marginBottom: "20px", fontSize: "2rem", fontWeight: "700" }}>
        Popular Movies
      </h1>
   
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
        <Genres />

    <div style={{ marginTop: "60px" }}>
      <Footer/>
    </div>
   
    </section> 
  )
}
// import { useEffect } from "react";
// import logo from "../assets/logo.svg";
// import MovieCard from "../components/MovieCard";
// import { useMovies } from "../context/Movie.context";
// import Genres from "../components/Genres";
// import Footer from "../components/Footer";

// export default function Homepage() {
//   const {
//     movies,
//     loading,
//     error,
//     getPopularMovies,
//     getGenres,
//     fetchMoviesForAllGenres,
//     genres,
//   } = useMovies();

//   console.log("MOVIES:", movies);

//   useEffect(() => {
//     getPopularMovies();
//     getGenres();
//   }, []);

//   useEffect(() => {
//     if (genres.length > 0) {
//       fetchMoviesForAllGenres(genres);
//     }
//   }, [genres]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     /*  FIX 1: replaced <section> with flex layout container */
//     <div className="flex flex-col min-h-screen w-full">

//       {/* MAIN CONTENT WRAPPER (takes remaining height) */}
//       <div className="flex-1 px-6 py-4">

//         {/* Logo */}
//         <img
//           style={{ width: "150px" }}
//           src={logo}
//           alt="CineVault logo"
//         />

       
//         <h1
//           style={{
//             marginBottom: "20px",
//             fontSize: "2rem",
//             fontWeight: "700",
//           }}
//         >
//           Popular Movies
//         </h1>

        
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(220px, 1fr))",
//             gap: "24px",
//           }}
//         >
//           {movies.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>

        
//         <Genres />

//       </div>

//       {/*  FIX 2: Footer moved OUTSIDE content flow */}
//       {/* This ensures it always stays at bottom and does NOT overlap */}
//       <Footer />

//     </div>
//   );
// }