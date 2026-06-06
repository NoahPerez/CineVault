import axios from "axios";

console.log(" API FILE IS RUNNING");
console.log("ENV CHECK:", import.meta.env);
const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export default api;