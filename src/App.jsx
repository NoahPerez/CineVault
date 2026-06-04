import "./App.css"
import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/homepage.jsx"
import MovieDetails from "./pages/MovieDetail.jsx"
import Watchlist from "./pages/Watchlist.jsx"
import Sidebar from "./components/SideBar.jsx"
import Profile from "./pages/Profile.jsx"
import NotFound from "./pages/NotFound.jsx"

function App() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
