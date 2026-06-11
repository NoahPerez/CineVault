import { useContext } from "react"
import { MovieContext } from "./MovieContext.jsx"

export function useMovies() {
  return useContext(MovieContext)
}