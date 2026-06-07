import { Link, NavLink } from "react-router-dom";
import "./SideBar.css";
import { Clapperboard, Film, Tv, Search, Bookmark, User } from "lucide-react"

import logo from "../assets/logo.svg";

const links = [
  { to: "/movies", label: "Movies", icon: Film },
  { to: "/tv-shows", label: "TV Shows", icon: Tv },
  { to: "/search", label: "Search", icon: Search },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: User },
]


export default function SideBar() {
    return (
      <aside className="sidebar">
        <Link to="/" className="sidebar__brand" aria-label="CineVault home">
          <Clapperboard className="sidebar__brand-icon" size={28} />
          <img className="sidebar__logo" src={logo} alt="CineVault logo" />
        </Link>

        <nav className="sidebar__nav">
          {links.map((link) => {
            const Icon = link.icon

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__link sidebar__link--active"
                    : "sidebar__link"
                }
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>
    )
  }
