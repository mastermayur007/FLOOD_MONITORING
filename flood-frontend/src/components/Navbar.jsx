import { Link } from "react-router-dom";
import "../styles/navbar.css";
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="dot"></span>
          FloodMonitor
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/activity">Activity</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
