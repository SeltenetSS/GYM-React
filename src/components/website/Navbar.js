// import React, { useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);


//   const location = useLocation();
//   const isAdminDashboard = location.pathname === "/admin-dashboard"; 

//   const redStyle = { color: "#e31c25" };

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

 
//   if (isAdminDashboard) {
//     return null; 
//   }

//   return (
//     <div id="navBar" className="position-absolute">
//       <nav className="navbar bg-dark-lg navbar-expand-lg">
//         <div className="container-fluid">
//           <Link id="gym" to="/" className="navbar-brand mx-lg-5 mx-4 mt-1">
//             <h1 className="m-0 display-2 font-weight-bold text-uppercase text-white">
//               gy<span style={redStyle}>m</span>
//               <i className="fa-solid fa-dumbbell" style={redStyle}></i>
//             </h1>
//           </Link>

//           <div className="menu me-3">
//             <button
//               type="button"
//               onClick={toggleMenu}
//               className="navbar-toggler"
//               data-toggle="collapse"
//               data-target="#navbarCollapse"
//             >
//               <span>
//                 <i className="fa-regular fa-bars"></i>
//               </span>
//             </button>
//           </div>

//           <div
//             className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0 text-uppercase">
//               <li className="nav-item">
//                 <NavLink className="nav-link home" exact to="/">
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/about">
//                   About Us
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/features">
//                   Features
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/contact">
//                   Contact
//                 </NavLink>
//               </li>

//               <li className="nav-item dropdown">
//                 <button
//                   className="nav-link dropdown-toggle"
//                   onClick={toggleDropdown}
//                 >
//                   Login
//                 </button>
//                 <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
//                   <li>
//                     <Link className="dropdown-item" to="/login?role=admin">
//                       Admin
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/login?role=user">
//                       Gym Gear
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/login?role=trainer">
//                       Trainer
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const location = useLocation();
//   const isAdminDashboard = location.pathname === "/admin-dashboard";

//   const redStyle = { color: "#e31c25" };

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   if (isAdminDashboard) {
//     return null;
//   }

//   return (
//     <div id="navBar" className="position-absolute">
//       <nav className="navbar bg-dark-lg navbar-expand-lg">
//         <div className="container-fluid">
//           <Link id="gym" to="/" className="navbar-brand mx-lg-5 mx-4 mt-1">
//             <h1 className="m-0 display-2 font-weight-bold text-uppercase text-white">
//               gy<span style={redStyle}>m</span>
//               <i className="fa-solid fa-dumbbell" style={redStyle}></i>
//             </h1>
//           </Link>

//           <div className="menu me-3">
//             <button
//               type="button"
//               onClick={toggleMenu}
//               className="navbar-toggler"
//               data-toggle="collapse"
//               data-target="#navbarCollapse"
//             >
//               <span>
//                 <i className="fa-regular fa-bars"></i>
//               </span>
//             </button>
//           </div>

//           <div
//             className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0 text-uppercase">
//               <li className="nav-item">
//                 <NavLink className="nav-link" exact="true" to="/">
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/about">
//                   About Us
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/features">
//                   Features
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/contact">
//                   Contact
//                 </NavLink>
//               </li>

//               <li className="nav-item dropdown">
//                 <NavLink
//                   className="nav-link dropdown-toggle"
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     toggleDropdown();
//                   }}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Login
//                 </NavLink>
//                 <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/login?role=admin"
//                       onClick={() => {
//                         setDropdownOpen(false);
//                         setMenuOpen(false);
//                       }}
//                     >
//                       Admin
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/login?role=user"
//                       onClick={() => {
//                         setDropdownOpen(false);
//                         setMenuOpen(false);
//                       }}
//                     >
//                       Gym Gear
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/login?role=trainer"
//                       onClick={() => {
//                         setDropdownOpen(false);
//                         setMenuOpen(false);
//                       }}
//                     >
//                       Trainer
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const isAdminDashboard = location.pathname === "/admin-dashboard";

  const redStyle = { color: "#e31c25" };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Dropdown bağlanması, linklərdən biri kliklənəndə
  useEffect(() => {
    if (location.pathname !== "/") {
      setDropdownOpen(false); // Eğer başqa bir səhifəyə keçilsə, dropdown bağlansın
    }
  }, [location]);

  if (isAdminDashboard) {
    return null;
  }

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
                <NavLink className="nav-link" exact="true" to="/">
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
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </NavLink>
                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/login?role=admin"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/login?role=user"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      Gym Gear
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/login?role=trainer"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
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
