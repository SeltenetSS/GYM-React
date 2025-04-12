import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Topbar from './sidebar/Topbar';
import Sidebar from './sidebar/Sidebar'; 
import Member from './member/Member'; 
import Equipment from './equipment/Equipment'; 
import Notfication from './notfication/Notfication'; 
import Payment from './payment/Payment'; 
import Attendance from './attendance/Attendance'; 
import Profile from './profile/Profile';
import Logout from './sidebar/Logout'; 
import Dashboard from './dashboard/Dashboard';

  
const TrainerDashboard = () => {
  return (
    <div className="trainer-rowContainer">
         <Topbar />
      <Sidebar />
      <div className="main-content">
        <Switch>
        <Route exact path="/trainer-dashboard" component={Dashboard} />
          <Route exact path="/trainer-dashboard/member" component={Member} />
          <Route exact path="/trainer-dashboard/equipment" component={Equipment} />
          <Route exact path="/trainer-dashboard/notfication" component={Notfication} />
          <Route exact path="/trainer-dashboard/payment" component={Payment} />
          <Route exact path="/trainer-dashboard/attendance" component={Attendance} />
          <Route exact path="/trainer-dashboard/profile" component={Profile} />
          <Route exact path="/trainer-dashboard/logout" component={Logout} />
        </Switch>
      </div>
    </div>
  );
};

export default TrainerDashboard;
