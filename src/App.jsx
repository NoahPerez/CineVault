import "./App.css"
import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage.jsx"
import Search from "./pages/Search"
import MovieDetails from "./pages/MovieDetail.jsx"
import Watchlist from "./pages/Watchlist.jsx"
import Sidebar from "./components/SideBar.jsx"
import Profile from "./pages/Profile.jsx"
import NotFound from "./pages/NotFound.jsx"
import TVShows from "./pages/TVShows.jsx"
import GenrePage from "./pages/GenrePage.jsx"


function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
    </div>
  )
}

export default App;

