// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Dashboard from './pages/Dashboard';
// import Member from './pages/Member';
// import Schedule from './pages/Schedule';
// import Trainer from './pages/Trainer';
// import Payment from './pages/Payment';
// import Setting from './pages/Setting';
// import Help from './pages/Help';
// import Logout from './pages/Logout';

// import AddMember from './pages/AddMember';
// import ViewMember from './pages/ViewMember';
// import ApproveMember from './pages/ApproveMember';
// const AdminDashboard = () => {
//   return (
//     <div className="rowContainer">
//       <Sidebar />
//       <div className="body">
//         <Topbar />
//         <Switch>
//           <Route exact path="/admin-dashboard" component={Dashboard} />
//           <Route path="/admin-dashboard/member" component={Member} />
//           <Route path="/admin-dashboard/member/add-member" component={AddMember} />
//           <Route path="/admin-dashboard/memberview-member" component={ViewMember} />
//           <Route path="/approve-member" component={ApproveMember} />
//           <Route path="/admin-dashboard/schedule" component={Schedule} />
//           <Route path="/admin-dashboard/trainer" component={Trainer} />
//           <Route path="/admin-dashboard/payment" component={Payment} />
//           <Route path="/admin-dashboard/setting" component={Setting} />
//           <Route path="/admin-dashboard/help" component={Help} />
//           <Route path="/admin-dashboard/logout" component={Logout} />
//         </Switch>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

import AddMember from './pages/AddMember';
import ViewMember from './pages/ViewMember';
import ApproveMember from './pages/ApproveMember';

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
