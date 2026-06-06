import { createContext, useContext, useState } from "react";
import api from "../lib/api";


const MovieContext = createContext()

export function MovieProvider({children}){
   const [movies, setMovies] =useState([]);
   const [loading, setLoading] =useState(true);
   const [searchResults, setSearchResults] =useState([]);
   const [selectedmovie, setSelectedmovie] =useState(null);
   const [error, setError] =useState(null);
    const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState({});

   const getPopularMovies = async () =>{
console.log(" getPopularMovies CALLED");

    try {
        setLoading(true)
        setError(null)
        const {data} = await api.get("/movie/popular");
        setMovies(data.results || [])
    } catch (error) {
        setError(error.message || "Error fetching popular movies")
    } finally {
        setLoading(false)
    }
   };


   const getMovieDetails = async (movieId) =>{
    try {
        setLoading(true)
        setError(null)
        const {data} = await api.get(`/movie/${movieId}`,{
          params: {
            append_to_response: "credits,images,videos,reviews,recommendations"
          },
        });
        setSelectedmovie(data)
    } catch (error) {
        setError(error.message || "Error fetching movies details")
    } finally {
        setLoading(false)
    }
   };


    // https://api.themoviedb.org/3/movie/{movie_id}/rating

    // const rateMovie = async (e,movieId, rating,) =>{
    //     e.preventDefault()
    //     try {
    //         setLoading(true)
    //         setError(null)
    //         const {data} = await api.post(`/movie/${movieId}/rating`,{
    //             value: rating
    //         })
    //         setSelectedmovie(data)
    //     } catch (error) {
    //         setError(error.message || "Error rating movie")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

   const searchMovies = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/search/movie", {
        params: { query },
      });
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err.message || "Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

// all the genre in the movie database
//   const getGenres = async () => {
//   try {
//     const { data } = await api.get("/genre/movie/list?language=en");
//     setGenres(data.genres || []);
//   } catch (error) {
//     setError(error.message || "Error fetching genres");
//   }
// };

// only slected one genre movies
const getGenres = async () => {
  try {
    const { data } = await api.get("/genre/movie/list?language=en");

    const allowedGenres = [
      "Action",
      "Comedy",
      "Horror",
      "Drama",
      "Science Fiction",
      "Thriller",
    ];

    const filteredGenres = data.genres.filter((genre) =>
      allowedGenres.includes(genre.name)
    );

    setGenres(filteredGenres);
  } catch (error) {
    setError(error.message || "Error fetching genres");
  }
};

const getMoviesByGenre = async (genreId) => {
  try {
    setLoading(true);
    setError(null);

    setSelectedGenre(genreId);

    const { data } = await api.get("/discover/movie", {
      params: {
        with_genres: genreId,
      },
    });

    setGenreMovies((prev) => ({
      ...prev,
      [genreId]: data.results || [],
    }));
  } catch (error) {
    setError(error.message || "Error fetching genre movies");
  } finally {
    setLoading(false);
  }
};

const fetchMoviesForAllGenres = async (genresList) => {
  try {
    const results = {};

    await Promise.all(
      genresList.map(async (genre) => {
        const { data } = await api.get("/discover/movie", {
          params: { with_genres: genre.id },
        });

        results[genre.id] = data.results || [];
      })
    );

    setGenreMovies(results);
  } catch (err) {
    console.log(err);
  }
};

    return (
        <MovieContext.Provider 
        value={{movies, 
        loading, 
        getPopularMovies, 
        error, 
        selectedmovie, 
        getMovieDetails, 
        searchResults, 
        searchMovies,
        genres,
        getGenres,
        getMoviesByGenre,
        selectedGenre,
        setSelectedGenre,
        genreMovies,
        fetchMoviesForAllGenres
        }}>
       {children}
        </MovieContext.Provider>
    )
}


export function useMovies(){
    return useContext(MovieContext)
}