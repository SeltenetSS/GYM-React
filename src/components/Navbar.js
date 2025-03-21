import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Gym Shop</Link>

        <button className="navbar-toggler" type="button" onClick={toggleDropdown}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={closeDropdown}>
                Ana Səhifə
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/products" ? "active" : ""}`} to="/products" onClick={closeDropdown}>
                Məhsullar
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact" onClick={closeDropdown}>
                Əlaqə
              </Link>
            </li>

            {/* Dropdown menyu */}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" onClick={toggleDropdown}>
                Hesab
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                {/* Admin */}
                <li><Link className="dropdown-item" to="/login?role=admin&type=signin" onClick={closeDropdown}>Admin Giriş</Link></li>
                <li><Link className="dropdown-item" to="/login?role=admin&type=signup" onClick={closeDropdown}>Admin Qeydiyyat</Link></li>
                <hr className="dropdown-divider" />
                
                {/* Gym Gear */}
                <li><Link className="dropdown-item" to="/login?role=gym-gear&type=signin" onClick={closeDropdown}>Gym Gear Giriş</Link></li>
                <li><Link className="dropdown-item" to="/login?role=gym-gear&type=signup" onClick={closeDropdown}>Gym Gear Qeydiyyat</Link></li>
                <hr className="dropdown-divider" />

                {/* Trainer */}
                <li><Link className="dropdown-item" to="/login?role=trainer&type=signin" onClick={closeDropdown}>Trainer Giriş</Link></li>
                <li><Link className="dropdown-item" to="/login?role=trainer&type=signup" onClick={closeDropdown}>Trainer Qeydiyyat</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
