import React from 'react';
import { Route, Switch } from 'react-router-dom';




// Admin səhifələrinə aid komponentlər
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './pages/Dashboard';
import Member from './pages/Member';
import Schedule from './pages/Schedule';
import Trainer from './pages/Trainer';
import Payment from './pages/Payment';
import Setting from './pages/Setting';
import Help from './pages/Help';
import Logout from './pages/Logout';

const AdminDashboard = () => {
  return (
    <div className="rowContainer">
      {/* Admin üçün Sidebar */}
      <Sidebar />
      <div className="body">
        {/* Admin üçün Topbar */}
        <Topbar />
        <Switch>
          {/* Admin Dashboard səhifələri */}
          <Route exact path="/admin-dashboard" component={Dashboard} />
          <Route exact path="/admin-dashboard/member" component={Member} />
          <Route exact path="/admin-dashboard/schedule" component={Schedule} />
          <Route exact path="/admin-dashboard/trainer" component={Trainer} />
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


