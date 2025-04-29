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
            <NavLink to="/admin-dashboard/package" className="nav-link" activeClassName="active">
            <Icon icon="mdi:arm-flex" className="icon" />

              <span>Package</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin-dashboard/group" className="nav-link" activeClassName="active">
            <Icon icon="mdi:account-group-outline" className="icon" />


              <span>Group</span>
            </NavLink>
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
          <div className="line" />
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
