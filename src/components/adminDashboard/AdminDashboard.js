import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Topbar from './sidebar/Topbar';
import Dashboard from './dashboard/Dashboard';
import Attendance from './attendance/Attendance'; 
import Member from './member/Member';
import Equipment from './equipment/Equipment';
import Trainer from './trainer/Trainer';
import Payment from './payment/Payment';
import Package from './package/Package'
import Profile from './profile/Profile';
import Logout from './sidebar/Logout';
import AddMember from './member/AddMember';
import ViewMember from './member/ViewMember';
import InfoMember from './member/InfoMember';
import ApproveMember from './member/ApproveMember';
import AddTrainer from './trainer/AddTrainer';
import AddNewEquipment from './equipment/AddNewEquipment';
import AddNewPackage from './package/AddNewPackage';
import ViewPackage from './package/ViewPackage';
import ViewEquipment from './equipment/ViewEquipment';
import ViewTrainer from './trainer/ViewTrainer';
import ApproveTrainer from './trainer/ApproveTrainer';
import TakeAttendance from './attendance/TakeAttendance';
import ViewAttendance from './attendance/ViewAttendance';

const AdminDashboard = () => {
  return (
    <div className="rowContainer">
      <Sidebar />
      <div className="body">
        <Topbar />
        <Switch>
          <Route exact path="/admin-dashboard" component={Dashboard} />
          <Route exact path="/admin-dashboard/member" component={Member} />
          <Route exact path="/admin-dashboard/member/add-member" component={AddMember} />
          <Route exact path="/admin-dashboard/member/view-member" component={ViewMember} />
          <Route exact path="/admin-dashboard/member/info-member" component={InfoMember} />
          <Route exact path="/admin-dashboard/member/approve-member" component={ApproveMember} />
          <Route exact path="/admin-dashboard/trainer" component={Trainer} />
          <Route exact path="/admin-dashboard/trainer/add-trainer" component={AddTrainer} />
          <Route exact path="/admin-dashboard/equipment/add-equipment" component={AddNewEquipment} />
          <Route exact path="/admin-dashboard/package/add-package" component={AddNewPackage} />
          <Route exact path="/admin-dashboard/trainer/view-trainer" component={ViewTrainer} />
          <Route exact path="/admin-dashboard/package/view-package" component={ViewPackage} />
          <Route exact path="/admin-dashboard/trainer/approve-trainer" component={ApproveTrainer} />
          <Route exact path="/admin-dashboard/payment" component={Payment} />
          <Route exact path="/admin-dashboard/package" component={Package} />
          <Route exact path="/admin-dashboard/attendance" component={Attendance} />
          <Route exact path="/admin-dashboard/attendance/take-attendance" component={TakeAttendance} />
          <Route exact path="/admin-dashboard/attendance/view-attendance" component={ViewAttendance} />
          <Route exact path="/admin-dashboard/equipment" component={Equipment} />
          <Route exact path="/admin-dashboard/equipment/view-equipment" component={ViewEquipment} />
          <Route exact path="/admin-dashboard/profile" component={Profile} />
          <Route exact path="/admin-dashboard/logout" component={Logout} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
