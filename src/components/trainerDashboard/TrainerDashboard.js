import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Topbar from './sidebar/Topbar';
import Sidebar from './sidebar/Sidebar'; 
import Member from './member/Member'; 
import Equipment from './equipment/Equipment'; 
import MySchedule from './mySchedule/MySchedule'; 
import Attendance from './attendance/Attendance'; 
import Profile from './profile/Profile';
import Logout from './sidebar/Logout'; 
import Dashboard from './dashboard/Dashboard';
import EquipmentUsage from './equipment/EquipmentUsage'; 
import AddUsage from './equipment/AddUsage';
import ViewUsage from './equipment/ViewUsage';
import ViewChart from './equipment/ViewChart';
import MyGroup from './mygroup/MyGroup';
import TakeAttendance from './attendance/TakeAttendance';
import ViewAttendance from './attendance/ViewAttendance';
const TrainerDashboard = () => {
  return (
    <div className="rowContainer">
       
      <Sidebar />
      <div className="body">
      <Topbar />
        <Switch>
        <Route exact path="/trainer-dashboard" component={Dashboard} />
          <Route exact path="/trainer-dashboard/member" component={Member} />
          <Route exact path="/trainer-dashboard/equipment" component={Equipment} />
          <Route exact path="/trainer-dashboard/mySchedule" component={MySchedule} />
          <Route exact path="/trainer-dashboard/MyGroup" component={MyGroup} />
          <Route exact path="/trainer-dashboard/attendance" component={Attendance} />
          <Route exact path="/trainer-dashboard/profile" component={Profile} />
          <Route exact path="/trainer-dashboard/logout" component={Logout} />
          <Route exact path="/trainer-dashboard/attendance/take-attendance" component={TakeAttendance} />
          <Route exact path="/trainer-dashboard/attendance/view-attendance" component={ViewAttendance} />
          <Route exact path="/trainer-dashboard/equipmentusage" component={EquipmentUsage} />
          <Route exact path="/trainer-dashboard/equipmentusage/add-usage" component={AddUsage} />
          <Route exact path="/trainer-dashboard/equipmentusage/view-usage" component={ViewUsage} />
          <Route exact path="/trainer-dashboard/equipmentusage/view-chart" component={ViewChart} />

        </Switch>
      </div>
    </div>
  );
};

export default TrainerDashboard;
