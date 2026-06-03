import { createContext, useContext, useState } from "react"
import api from "../lib/api"


const MovieContext = createContext()

export function MovieProvider({children}){
   const [movies, setMovies] =useState([]);
   const [loading, setLoading] =useState(true);
   const [searchResults, setSearchResults] =useState([]);
   const [selectedmovie, setSelectedmovie] =useState(null);
   const [error, setError] =useState(null);

   const getPopularMovies = async () =>{
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
        value={{movies, 
        loading, 
        getPopularMovies, 
        error, 
        selectedmovie, 
        getMovieDetails, 
        searchResults, 
        searchMovies
        }}>
       {children}
        </MovieContext.Provider>
    )
}


export function useMovies(){
    return useContext(MovieContext)
}