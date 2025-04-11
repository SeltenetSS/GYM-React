import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Topbar from './sidebar/Topbar';
import Sidebar from './sidebar/Sidebar'; 
import Equipment from './equipment/Equipment'; 
import Notfication from './notfication/Notfication'; 
import UserAttendance from './attendance/Attendance'; 
import Profile from './profile/Profile'; 
import Logout from './sidebar/Logout';
import Dashboard from './dashboard/Dashboard';

const UserDashboard = () => {
    return (
        <div className="user-rowContainer">
             <Topbar />
          <Sidebar />
          <div className="main-content">
            <Switch>
            <Route exact path="/user-dashboard" component={Dashboard} />
              <Route path="/user-dashboard/equipment" component={Equipment} />
              <Route path="/user-dashboard/notfication" component={Notfication} />
              <Route path="/user-dashboard/userattendance" component={UserAttendance} />
              <Route path="/user-dashboard/profile" component={Profile} />
              <Route path="/user-dashboard/logout" component={Logout} />
            </Switch>
          </div>
        </div>
      );
};

export default UserDashboard;
