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
import adminChat from './chat/adminChat';
import CreateGroup from './group/CreateGroup';
import ViewGroup from './group/ViewGroup';
import GroupDetails from './group/GroupDetails';
import AddProduct from './product/AddProduct';
import ViewProduct from './product/ViewProduct';
import PointOrdersPage from './product/PointOrdersPage';
import AddWorkout from './workout/AddWorkout';
import ViewWorkout from './workout/ViewWorkout';
import TrainerScheduleCreate from './schedule/TrainerScheduleCreate';
import ViewSchedule from './schedule/ViewSchedule';
import AdminNotification from './notification/AdminNotification';
import Blocked from './blocked/Blocked';
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
          <Route exact path="/admin-dashboard/chat" component={adminChat}/>
          <Route exact path="/admin-dashboard/group/create" component={CreateGroup}/>
          <Route exact path="/admin-dashboard/group/view-group" component={ViewGroup}/>
          <Route exact path="/admin-dashboard/group/group-details" component={GroupDetails}/>
          <Route exact path="/admin-dashboard/product/add" component={AddProduct}/>
          <Route exact path="/admin-dashboard/product/view" component={ViewProduct}/>
          <Route exact path="/admin-dashboard/workout/add" component={AddWorkout}/>
          <Route exact path="/admin-dashboard/workout/view" component={ViewWorkout}/>
          <Route path="/admin-dashboard/product/orders" component={PointOrdersPage } />
          <Route path="/admin-dashboard/schedule/create" component={TrainerScheduleCreate } />
           <Route path="/admin-dashboard/schedule/view" component={ViewSchedule } />
           <Route path="/admin-dashboard/notification" component={AdminNotification } />
            <Route path="/admin-dashboard/blocked" component={Blocked} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
