
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const redStyle = { color: "#e31c25" };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div id="navBar" className="position-absolute">
      <nav className="navbar bg-dark-lg navbar-expand-lg">
        <div className="container-fluid">
          <Link id="gym" to="/" className="navbar-brand mx-lg-5 mx-4 mt-1">
            <h1 className="m-0 display-2 font-weight-bold text-uppercase text-white">
              gy<span style={redStyle}>m</span>
              <i className="fa-solid fa-dumbbell" style={redStyle}></i>
            </h1>
          </Link>

          <div className="menu me-3">
            <button
              type="button"
              onClick={toggleMenu}
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span>
                <i className="fa-regular fa-bars"></i>
              </span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0 text-uppercase">
              <li className="nav-item">
                <NavLink className="nav-link home" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/features">
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>

              <li className="nav-item dropdown">
  <button
    className="nav-link dropdown-toggle"
    onClick={toggleDropdown}
  >
    Login
  </button>
  <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
    <li>
      <Link className="dropdown-item" to="/login?role=admin">
        Admin
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/login?role=gym-gear">
        Gym Gear
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/login?role=trainer">
        Trainer
      </Link>
    </li>
  </ul>
</li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
