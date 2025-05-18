import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Topbar from './sidebar/Topbar';
import Sidebar from './sidebar/Sidebar'; 
import Equipment from './equipment/Equipment'; 

import Package from './package/Package';  
import UserAttendance from './attendance/Attendance'; 
import Profile from './profile/Profile'; 
import Logout from './sidebar/Logout';
import Dashboard from './dashboard/Dashboard';
import Shop from './shop/Shop'; 
import Payments from './payment/Payments';
import MyFeedbacks from './myfeedback/MyFeedBacks';
import Notification from './notification/Notification';
import WorkoutUser from './workout/WorkoutUser';
import axios from 'axios';
import NotificationListener from '../website/NotificationListener';
 

const UserDashboard = () => {
    const accessToken = localStorage.getItem("token");
  console.log("LocalStorage'dan alınan accessToken:", accessToken);
  const [profileImage, setProfileImage] = useState('/default-avatar.png'); 

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
       {accessToken && <NotificationListener accessToken={accessToken} />}
      <Sidebar />
      <div className="body">
        <Topbar profileImage={profileImage} />
        <Switch>
          <Route exact path="/user-dashboard" component={Dashboard} />
          <Route exact path="/user-dashboard/equipment" component={Equipment} />
          
          <Route exact path="/user-dashboard/package" component={Package} />
          <Route exact path="/user-dashboard/payment" component={Payments} />
          <Route exact path="/user-dashboard/review" component={MyFeedbacks} />
              <Route exact path="/user-dashboard/notification" component={Notification} />
          <Route exact path="/user-dashboard/userattendance" component={UserAttendance} />
          <Route exact path="/user-dashboard/shop" component={Shop} />
           <Route exact path="/user-dashboard/workout" component={WorkoutUser} />
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
