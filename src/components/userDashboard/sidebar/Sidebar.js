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
            <NavLink to="/user-dashboard" className="nav-link" activeClassName="active">
              <Icon icon="radix-icons:dashboard" className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-dashboard/member" className="nav-link" activeClassName="active">
            <Icon icon="map:gym" className="icon" />
              <span>Notfication</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-dashboard/equipment" className="nav-link" activeClassName="active">
              <Icon icon="material-symbols:calendar-month-outline-rounded" className="icon" />
              <span>Equipment</span>
            </NavLink>
          </li>
        
          <li className="nav-item">
            <NavLink to="/user-dashboard/payment" className="nav-link" activeClassName="active">
              <Icon icon="material-symbols:calendar-month-outline-rounded" className="icon" />
              <span>Payment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-dashboard/package" className="nav-link" activeClassName="active">
                 <Icon icon="mdi:arm-flex" className="icon" />
              <span>Package</span>
            </NavLink>
          </li>
          <li className="nav-item">
  <NavLink to="/user-dashboard/shop" className="nav-link" activeClassName="active">
    <Icon icon="material-symbols:storefront-outline" className="icon" />
    <span>Shop</span>
  </NavLink>
</li>

          <li className="nav-item">
            <NavLink to="/user-dashboard/profile" className="nav-link" activeClassName="active">
              <Icon icon="ion:help-buoy-sharp" className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/user-dashboard/logout"
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
