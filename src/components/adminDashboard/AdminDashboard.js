import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../website/Sidebar';
import Topbar from '../website/Topbar';
import Dashboard from './sidebar/Dashboard';

import Member from './sidebar/Member';
import Schedule from './sidebar/Schedule';
import Trainer from './sidebar/Trainer';
import Payment from './sidebar/Payment';
import Setting from './sidebar/Setting';
import Help from './sidebar/Help';
import Logout from './sidebar/Logout';
import AddMember from './member/AddMember';
import ViewMember from './member/ViewMember';
import ApproveMember from './member/ApproveMember';
import AddTrainer from './trainer/AddTrainer';
import ViewTrainer from './trainer/ViewTrainer';
import ApproveTrainer from './trainer/ApproveTrainer';

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
          <Route exact path="/admin-dashboard/member/approve-member" component={ApproveMember} />
          <Route exact path="/admin-dashboard/schedule" component={Schedule} />
          <Route exact path="/admin-dashboard/trainer" component={Trainer} />
          <Route exact path="/admin-dashboard/trainer/add-trainer" component={AddTrainer} />
          <Route exact path="/admin-dashboard/trainer/view-trainer" component={ViewTrainer} />
          <Route exact path="/admin-dashboard/trainer/approve-trainer" component={ApproveTrainer} />
          <Route exact path="/admin-dashboard/payment" component={Payment} />
          <Route exact path="/admin-dashboard/setting" component={Setting} />
          <Route exact path="/admin-dashboard/help" component={Help} />
          <Route exact path="/admin-dashboard/logout" component={Logout} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
