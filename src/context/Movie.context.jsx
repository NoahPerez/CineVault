import { createContext, useContext, useState } from "react"
import api from "../lib/api"


const MovieContext = createContext()

export function MovieProvider({children}){
   const [popularMovies, setPopularMovies] =useState([]);
   const [upcomingMovies, setUpcomingMovies] =useState([]);
   const [popularTvShows, setPopularTvShows] =useState([]);
   const [movieGenre, setMovieGenre] =useState([]);
   const [selectedTv, setSelectedTv] = useState(null)
   const [loading, setLoading] =useState(true);
   const [searchResults, setSearchResults] =useState([]);
   const [selectedmovie, setSelectedmovie] =useState(null);
   const [error, setError] =useState(null);

   const getPopularMovies = async () =>{
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
        movieGenre,
        getMovieGenre,
        getMovieDetails, 
        selectedTv,
        getTvDetails,
        searchResults, 
        searchMovies,
        }}>
       {children}
        </MovieContext.Provider>
    )
}


export function useMovies(){
    return useContext(MovieContext)
}