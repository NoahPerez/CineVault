import "./App.css";
import { Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage.jsx";
import MovieDetails from "./pages/MovieDetail.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Sidebar from "./components/SideBar.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import GenrePage from "./pages/GenrePage.jsx";
function App() {
  return (
     <div className="flex min-h-screen w-full bg-black text-white">
    
      <Sidebar />
      <div>
{/* <div classNmae= "flex flex-col flex-1 min-h-screen"> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      </div>
  );
}

export default App;

