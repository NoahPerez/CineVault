import axios from "axios";

const watchlistApi = axios.create({
    baseURL: import.meta.env.VITE_WATCHLIST_API_URL
})

export default watchlistApi;