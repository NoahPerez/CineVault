import { useState } from "react";
import { MovieContext } from "./MovieContext.jsx"
import api from "../lib/api.js";
 



export function MovieProvider({children}){
   const [popularMovies, setPopularMovies] =useState([]);
   const [upcomingMovies, setUpcomingMovies] =useState([]);
   const [popularTvShows, setPopularTvShows] =useState([]);
   const [selectedTv, setSelectedTv] = useState(null)
   const [loading, setLoading] =useState(true);
   const [searchResults, setSearchResults] =useState([]);
   const [selectedmovie, setSelectedmovie] =useState(null);
   const [selectedTvSeasons, setSelectedTvSeasons] =useState(null);
  const [selectedTvEpisode, setSelectedTvEpisode] =useState(null);
  const [selectedTvEpisodeVideos, setSelectedTvEpisodeVideos] =useState(null);
  const [seasonLoading, setSeasonLoading] = useState(false)
  const [seasonError, setSeasonError] = useState(null)
  const [episodeVideoLoading, setEpisodeVideoLoading] = useState(false)
  const [episodeVideoError, setEpisodeVideoError] = useState(null)

  const [error, setError] =useState(null);
    const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState({});

  const [youMayLike, setYouMayLike] = useState([])
  const [youMayLikeLoading, setYouMayLikeLoading] = useState(false)
  const [youMayLikeError, setYouMayLikeError] = useState(null)

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

// TV Seasons
// https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}

const getTvSeasons = async (series_id, season_number) =>{
  try {
    setSeasonLoading(true)
    setSeasonError(null)
    const { data } = await api.get(`/tv/${series_id}/season/${season_number}`)
    setSelectedTvSeasons(data)
  } catch (error) {
    setSeasonError(error.message || "Error fetching tv season number")
  } finally {
    setSeasonLoading(false)
  }
}

// GET TV Episodes
// https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}
const getTvEpisode = async (series_id, season_number, episode_number) =>{
  try {
    setLoading(true)
    setError(null)
    const { data } = await api.get(`/tv/${series_id}/season/${season_number}/episode/${episode_number}`)
    setSelectedTvEpisode(data)
  } catch (error) {
    setError(error.message || "Error fetching tv episode")
  } finally {
    setLoading(false)
  }
}

// GET TV Episodes VIDEOS
// https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/videos
const getTvEpisodeVideos = async (series_id, season_number, episode_number) => {
  try {
    setEpisodeVideoLoading(true)
    setEpisodeVideoError(null)
    const { data } = await api.get(
      `/tv/${series_id}/season/${season_number}/episode/${episode_number}/videos`
    )
    setSelectedTvEpisodeVideos(data)
  } catch (error) {
    setEpisodeVideoError(error.message || "Error fetching tv episode videos")
  } finally {
    setEpisodeVideoLoading(false)
  }
}

// Do we need this to fetch the genre?
// const getMovieGenre = async () =>{
//   try {
//     setLoading(true)
//     setError(null)
//     const { data } = await api.get("/genre/movie/list")
//     setMovieGenre(data.genres || [])
//   } catch (error) {
//     setError(error.message || "Error fetching movie genre")
//   } finally {
//     setLoading(false)
//   }
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

  // Recommandation Fetch Functions for Profile Page

  const getYouMayLike = async (watchlist = []) => {
    if (!watchlist.length) {
      setYouMayLike([])
      return
    }

    try {
      setYouMayLikeLoading(true)
      setYouMayLikeError(null)

      const watchedTitle = watchlist.find((item) => item.watched)
      const sourceTitle = watchedTitle || watchlist[0]

      const mediaType = sourceTitle.mediaType || sourceTitle.media_type || "movie"

      const endpoint =
        mediaType === "tv"
          ? `/tv/${sourceTitle.tmdbId}/recommendations`
          : `/movie/${sourceTitle.tmdbId}/recommendations`

      const { data } = await api.get(endpoint)

      const filteredResults = (data.results || []).filter((recommendation) => {
        return !watchlist.find((savedTitle) => {
          const savedMediaType = savedTitle.mediaType || savedTitle.media_type || "movie"

          return (
            savedMediaType === mediaType &&
            String(savedTitle.tmdbId) === String(recommendation.id)
          )
        })
      })

      const resultsWithMediaType = filteredResults.map((recommendation) => {
        return {
          ...recommendation,
          mediaType: mediaType,
        }
      })

      setYouMayLike(resultsWithMediaType.slice(0, 5))
    } catch (error) {
      setYouMayLikeError(error.message || "Could not load recommendations")
    } finally {
      setYouMayLikeLoading(false)
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
        selectedTvSeasons,
        getTvSeasons,
        seasonLoading,
        seasonError,
        selectedTvEpisode,
        getTvEpisode,
        selectedTvEpisodeVideos,
        setSelectedTvEpisodeVideos,
        setSelectedTvEpisode,
        getTvEpisodeVideos,
        episodeVideoLoading,
        episodeVideoError,
        setSelectedTvSeasons,
        genres,
        getGenres,
        getMoviesByGenre,
        selectedGenre,
        setSelectedGenre,
        genreMovies,
        fetchMoviesForAllGenres,
        youMayLike,
        youMayLikeLoading,
        youMayLikeError,
        getYouMayLike,
        }}>
       {children}
        </MovieContext.Provider>
    )
}