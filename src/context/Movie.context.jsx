import { createContext, useContext, useState } from "react";
import api from "../lib/api";


const MovieContext = createContext()

export function MovieProvider({children}){
   const [popularMovies, setPopularMovies] =useState([]);
   const [upcomingMovies, setUpcomingMovies] =useState([]);
   const [popularTvShows, setPopularTvShows] =useState([]);
   const [selectedTv, setSelectedTv] = useState(null)
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
        setPopularMovies(data.results || [])
    } catch (error) {
        setError(error.message || "Error fetching popular movies")
    } finally {
        setLoading(false)
    }
   };

   const getUpcomingMovies = async () =>{
    try {
        setLoading(true)
        setError(null)
        const {data} = await api.get("/movie/upcoming");
        setUpcomingMovies(data.results || [])
    } catch (error) {
        setError(error.message || "Error fetching upcoming movies")
    } finally {
        setLoading(false)
    }
   };

   const getPopularTvShows = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.get("/tv/popular")
      setPopularTvShows(data.results || [])
    } catch (error) {
      setError(error.message || "Error fetching popular tv shows")
    } finally {
      setLoading(false)
    }
   }

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

   const getTvDetails = async (seriesId) => {
  try {
    setLoading(true)
    setError(null)

    const { data } = await api.get(`/tv/${seriesId}`, {
      params: {
        append_to_response: "credits,images,videos,reviews,recommendations",
      },
    })

    setSelectedTv(data)
  } catch (error) {
    setError(error.message || "Error fetching tv details")
  } finally {
    setLoading(false)
  }
}
const getMovieGenre = async () =>{
  try {
    setLoading(true)
    setError(null)
    const { data } = await api.get("/genre/movie/list")
    setMovieGenre(data.genres || [])
  } catch (error) {
    setError(error.message || "Error fetching movie genre")
  } finally {
    setLoading(false)
  }
}


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
  const getGenres = async () => {
  try {
    const { data } = await api.get("/genre/movie/list?language=en");
    setGenres(data.genres || []);
    fetchMoviesForAllGenres(data.genres || [])
  } catch (error) {
    setError(error.message || "Error fetching genres");
  }
};

// only slected one genre movies

// const getGenres = async () => {
//     try {
//       setError(null)

//       const { data } = await api.get("/genre/movie/list?language=en")

//       const allowedGenres = [
//         "Action",
//         "Comedy",
//         "Horror",
//         "Drama",
//         "Science Fiction",
//         "Thriller",
//       ]

//       const filteredGenres = data.genres.filter((genre) =>
//         allowedGenres.includes(genre.name)
//       )

//       setGenres(filteredGenres)

      
//       fetchMoviesForAllGenres(filteredGenres)
//     } catch (error) {
//       setError(error.message)
//     }
//   }

const getMoviesByGenre = async (genreId) => {
    try {
      setError(null)

      const { data } = await api.get("/discover/movie", {
        params: {
          with_genres: genreId,
        },
      })

      setGenreMovies((prev) => ({
        ...prev,
        [genreId]: data.results || [],
      }))
    } catch (error) {
      setError(error.message)
    }
  }


const fetchMoviesForAllGenres = async (genresList) => {
    try {
      const results = {}

      await Promise.all(
        genresList.map(async (genre) => {
          const { data } = await api.get("/discover/movie", {
            params: { with_genres: genre.id },
          })

          results[genre.id] = data.results || []
        })
      )

      setGenreMovies(results)
    } catch (err) {
      console.log("Error fetching genre movies:", err)
    }
  }

    return (
        <MovieContext.Provider 
        value={{popularMovies, 
        upcomingMovies,
        popularTvShows,
        loading, 
        getPopularMovies, 
        getUpcomingMovies,
        getPopularTvShows,
        error, 
        selectedmovie, 
        getMovieDetails, 
        selectedTv,
        getTvDetails,
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