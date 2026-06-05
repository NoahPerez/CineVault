import { NavLink } from "react-router-dom";
import "./SideBar.css";

import logo from "../assets/logo.svg";

const links = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Search" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/profile", label: "Profile" },
]


export default function SideBar() {
    return (
      <aside className="sidebar">
        <img className="sidebar__logo" src={logo} alt="CineVault logo" />

        <nav className="sidebar__nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "sidebar__link sidebar__link--active"
                  : "sidebar__link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    )
  }
