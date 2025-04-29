import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Topbar from './sidebar/Topbar';
import Sidebar from './sidebar/Sidebar'; 
import Equipment from './equipment/Equipment'; 
import Notfication from './notfication/Notfication';
import Package from './package/Package';  
import UserAttendance from './attendance/Attendance'; 
import Profile from './profile/Profile'; 
import Logout from './sidebar/Logout';
import Dashboard from './dashboard/Dashboard';
import axios from 'axios';

const UserDashboard = () => {
  const [profileImage, setProfileImage] = useState('/default-avatar.png'); // default şəkil

  useEffect(() => {
    axios.get("https://localhost:7054/api/User/user-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(response => {
      if (response.data.imageUrl) {
        setProfileImage(response.data.imageUrl);
      }
    })
    .catch(error => {
      console.error("Failed to fetch user profile:", error);
    });
  }, []);

  return (
    <div className="rowContainer">
      <Sidebar />
      <div className="body">
        <Topbar profileImage={profileImage} />
        <Switch>
          <Route exact path="/user-dashboard" component={Dashboard} />
          <Route exact path="/user-dashboard/equipment" component={Equipment} />
          <Route exact path="/user-dashboard/notfication" component={Notfication} />
          <Route exact path="/user-dashboard/package" component={Package} />
          <Route exact path="/user-dashboard/userattendance" component={UserAttendance} />
          <Route exact path="/user-dashboard/profile">
            <Profile setProfileImage={setProfileImage} />
          </Route>
          <Route exact path="/user-dashboard/logout" component={Logout} />
        </Switch>
      </div>
    </div>
  );
};

export default UserDashboard;
