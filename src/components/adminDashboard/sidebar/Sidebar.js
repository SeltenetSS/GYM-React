// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Icon } from '@iconify/react';
// import logo from '../../../assets/logo.png';
// import logoIcon from '../../../assets/logo-icon.png';
// import Logout from './Logout';

// const Sidebar = () => {
//   const [groupMenuOpen, setGroupMenuOpen] = useState(false);
//   const [productMenuOpen, setProductMenuOpen] = useState(false);
//   const [workoutMenuOpen, setWorkoutMenuOpen] = useState(false); // Yeni workout menyusu

//   const toggleGroupMenu = () => {
//     setGroupMenuOpen(!groupMenuOpen);
//   };

//   const toggleProductMenu = () => {
//     setProductMenuOpen(!productMenuOpen);
//   };

//   const toggleWorkoutMenu = () => {
//     setWorkoutMenuOpen(!workoutMenuOpen);
//   };

//   return (
//     <div className="sidebar">
//       <div className="logo" id="logo-full">
//         <img src={logo} alt="logo" />
//       </div>
//       <div className="logo" id="logo-icon">
//         <img src={logoIcon} alt="logo icon" />
//       </div>
//       <div className="menu">
//         <ul className="nav">
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard" className="nav-link" activeClassName="active">
//               <Icon icon="material-symbols:stacked-line-chart" className="icon" />
//               <span>Dashboard</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/member" className="nav-link" activeClassName="active">
//               <Icon icon="octicon:people-24" className="icon" />
//               <span>Members</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/attendance" className="nav-link" activeClassName="active">
//               <Icon icon="mdi:clipboard-check-outline" className="icon" />
//               <span>Attendance</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/package" className="nav-link" activeClassName="active">
//               <Icon icon="mdi:arm-flex" className="icon" />
//               <span>Package</span>
//             </NavLink>
//           </li>

//           <li className="nav-item">
//             <a
//               href="#!"
//               className="nav-link"
//               onClick={toggleGroupMenu}
//               aria-expanded={groupMenuOpen ? 'true' : 'false'}
//             >
//               <Icon icon="mdi:account-group-outline" className="icon" />
//               <span>Group</span>
//             </a>
//             {groupMenuOpen && (
//               <ul className="nav-group-dropdown">
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/group/create" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> Create Group
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/group/view-group" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> View Group
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/group/group-details" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> Group Details
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li className="nav-item">
//             <div
//               className="nav-link"
//               onClick={toggleProductMenu}
//               aria-expanded={productMenuOpen ? 'true' : 'false'}
//               style={{ cursor: 'pointer' }}
//             >
//               <Icon icon="mdi:cart-outline" className="icon" />
//               <span>Product</span>
//             </div>
//             {productMenuOpen && (
//               <ul className="nav-group-dropdown">
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/product/add" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> Add Product
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/product/view" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> View Product
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li className="nav-item">
//             <div
//               className="nav-link"
//               onClick={toggleWorkoutMenu}
//               aria-expanded={workoutMenuOpen ? 'true' : 'false'}
//               style={{ cursor: 'pointer' }}
//             >
//               <Icon icon="mdi:weight-lifter" className="icon" />
//               <span>Workout</span>
//             </div>
//             {workoutMenuOpen && (
//               <ul className="nav-group-dropdown">
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/workout/add" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> Add Workout
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/admin-dashboard/workout/view" className="nav-link" activeClassName="active">
//                     <span className="dot">•</span> View Workouts
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/trainer" className="nav-link" activeClassName="active">
//               <Icon icon="map:gym" className="icon" />
//               <span>Trainers</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/equipment" className="nav-link" activeClassName="active">
//               <Icon icon="mdi:hammer-wrench" className="icon" />
//               <span>Equipment</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/payment" className="nav-link" activeClassName="active">
//               <Icon icon="mdi:credit-card-outline" className="icon" />
//               <span>Payments</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/chat" className="nav-link" activeClassName="active">
//               <Icon icon="mdi:chat-processing-outline" className="icon" />
//               <span>Chat</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/admin-dashboard/profile" className="nav-link" activeClassName="active">
//               <Icon icon="mdi:account-circle-outline" className="icon" />
//               <span>Profile</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink
//               to="/admin-dashboard/logout"
//               className="nav-link"
//               data-bs-toggle="modal"
//               data-bs-target="#logout-modal"
//             >
//               <Icon icon="bx:log-out-circle" className="icon" />
//               <span>Log Out</span>
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       <Logout />
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../../../assets/logo.png';
import logoIcon from '../../../assets/logo-icon.png';
import Logout from './Logout';

const Sidebar = () => {
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [workoutMenuOpen, setWorkoutMenuOpen] = useState(false);
    const [scheduleMenuOpen, setScheduleMenuOpen] = useState(false); 

  const toggleGroupMenu = () => {
    setGroupMenuOpen(!groupMenuOpen);
  };

  const toggleProductMenu = () => {
    setProductMenuOpen(!productMenuOpen);
  };

  const toggleWorkoutMenu = () => {
    setWorkoutMenuOpen(!workoutMenuOpen);
  };

    const toggleScheduleMenu = () => {  
    setScheduleMenuOpen(!scheduleMenuOpen);
  };

  return (
    <div className="sidebar">
      <div className="logo" id="logo-full">
        <img src={logo} alt="logo" />
      </div>
      <div className="logo" id="logo-icon">
        <img src={logoIcon} alt="logo icon" />
      </div>
      <div className="menu">
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/admin-dashboard" className="nav-link" activeClassName="active">
              <Icon icon="material-symbols:stacked-line-chart" className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/member" className="nav-link" activeClassName="active">
              <Icon icon="octicon:people-24" className="icon" />
              <span>Members</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/attendance" className="nav-link" activeClassName="active">
              <Icon icon="mdi:clipboard-check-outline" className="icon" />
              <span>Attendance</span>
            </NavLink>
          </li>
          
           <li className="nav-item">
            <NavLink to="/admin-dashboard/notification" className="nav-link" activeClassName="active">
              <Icon icon="mdi:bell-ring-outline" className="icon" />
              <span>Notification</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/package" className="nav-link" activeClassName="active">
              <Icon icon="mdi:arm-flex" className="icon" />
              <span>Package</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <a
              href="#!"
              className="nav-link"
              onClick={toggleGroupMenu}
              aria-expanded={groupMenuOpen ? 'true' : 'false'}
            >
              <Icon icon="mdi:account-group-outline" className="icon" />
              <span>Group</span>
            </a>
            {groupMenuOpen && (
              <ul className="nav-group-dropdown">
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/group/create" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> Create Group
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/group/view-group" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> View Group
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/group/group-details" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> Group Details
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
<li className="nav-item">
            <div
              className="nav-link"
              onClick={toggleScheduleMenu}
              aria-expanded={scheduleMenuOpen ? 'true' : 'false'}
              style={{ cursor: 'pointer' }}
            >
              <Icon icon="mdi:calendar-clock" className="icon" />
              <span>Schedule</span>
            </div>
            {scheduleMenuOpen && (
              <ul className="nav-group-dropdown">
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/schedule/create" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> Create Schedule
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/schedule/view" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> View Schedule
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <div
              className="nav-link"
              onClick={toggleProductMenu}
              aria-expanded={productMenuOpen ? 'true' : 'false'}
              style={{ cursor: 'pointer' }}
            >
              <Icon icon="mdi:cart-outline" className="icon" />
              <span>Product</span>
            </div>
            {productMenuOpen && (
              <ul className="nav-group-dropdown">
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/product/add" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> Add Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/product/view" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> View Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/product/orders" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <div
              className="nav-link"
              onClick={toggleWorkoutMenu}
              aria-expanded={workoutMenuOpen ? 'true' : 'false'}
              style={{ cursor: 'pointer' }}
            >
              <Icon icon="mdi:weight-lifter" className="icon" />
              <span>Workout</span>
            </div>
            {workoutMenuOpen && (
              <ul className="nav-group-dropdown">
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/workout/add" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> Add Workout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard/workout/view" className="nav-link" activeClassName="active">
                    <span className="dot">•</span> View Workouts
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <NavLink to="/admin-dashboard/trainer" className="nav-link" activeClassName="active">
              <Icon icon="map:gym" className="icon" />
              <span>Trainers</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/equipment" className="nav-link" activeClassName="active">
              <Icon icon="mdi:hammer-wrench" className="icon" />
              <span>Equipment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/payment" className="nav-link" activeClassName="active">
              <Icon icon="mdi:credit-card-outline" className="icon" />
              <span>Payments</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/chat" className="nav-link" activeClassName="active">
              <Icon icon="mdi:chat-processing-outline" className="icon" />
              <span>Chat</span>
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink to="/admin-dashboard/blocked" className="nav-link" activeClassName="active">
              <Icon icon="mdi:account-cancel-outline" className="icon" />
              <span>Blocked</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/profile" className="nav-link" activeClassName="active">
              <Icon icon="mdi:account-circle-outline" className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin-dashboard/logout"
              className="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#logout-modal"
            >
              <Icon icon="bx:log-out-circle" className="icon" />
              <span>Log Out</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
