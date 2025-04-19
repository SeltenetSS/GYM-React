import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../../../assets/logo.png';
import logoIcon from '../../../assets/logo-icon.png';
import Logout from './Logout';

const Sidebar = () => {
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
            <NavLink to="/trainer-dashboard" className="nav-link" activeClassName="active">
              <Icon icon="radix-icons:dashboard" className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer-dashboard/member" className="nav-link" activeClassName="active">
              <Icon icon="octicon:people-24" className="icon" />
              <span>Members</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer-dashboard/equipment" className="nav-link" activeClassName="active">
              <Icon icon="material-symbols:calendar-month-outline-rounded" className="icon" />
              <span>Equipment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer-dashboard/equipmentusage" className="nav-link" activeClassName="active">
              <Icon icon="map:gym" className="icon" />
              <span>Equipment Usage</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer-dashboard/MySchedule" className="nav-link" activeClassName="active">
              <Icon icon="ic:outline-payment" className="icon" />
              <span>My Schedule</span>
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink to="/trainer-dashboard/MyGroup" className="nav-link" activeClassName="active">
              <Icon icon="ic:outline-payment" className="icon" />
              <span>My Group</span>
            </NavLink>
          </li> 
          <div className="line" />
          <li className="nav-item">
            <NavLink to="/trainer-dashboard/attendance" className="nav-link" activeClassName="active">
              <Icon icon="material-symbols:settings-outline" className="icon" />
              <span>Attendance</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trainer-dashboard/profile" className="nav-link" activeClassName="active">
              <Icon icon="ion:help-buoy-sharp" className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/trainer-dashboard/logout"
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
