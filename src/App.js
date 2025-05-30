
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import './components/website/Navbar.css';
// import './components/website/Banner.css';
// import './components/website/GymClass.css';
// import './components/website/About.css';
// import './components/website/ChoseUs.css';
// import './components/website/Team.css';
// import './components/website/Subscribe.css';
// import './components/website/MonthlyPlan.css';
// import './components/website/BMI.css';
// import './components/website/Testimonial.css';
// import './components/website/Footer.css';
// import './components/website/PageHeader.css';
// import './components/website/Features.css';
// import './components/website/Services.css';
// import './components/website/Contact.css';
// import './components/website/Auth.css';

// import './responsive.css';

// import Navbar from './components/website/Navbar';
// import HomeNav from "./routes/HomeNav";
// import AboutNav from "./routes/AboutNav";
// import FeaturesNav from "./routes/FeaturesNav";
// import ContactNav from "./routes/ContactNav";
// import SignInNav from "./routes/SignInNav";
// import SignUpNav from "./routes/SignUpNav";
// import AdminSignUpNav from "./routes/AdminSignUpNav";
// import AdminDashboardNav from "./routes/AdminDashboardNav";
// import Footer from './components/website/Footer';
// import TrainerDashboardNav from "./routes/TrainerDashboardNav";
// import UserDashboardNav from "./routes/UserDashboardNav";
// import   './App.scss';
// import GuestChat from './components/adminDashboard/chat/guestChat';
// import React, { useState } from "react";
// import './components/adminDashboard/chat/chatstyles.css';
// function App() {
//   const [chatOpen, setChatOpen] = useState(false);

//   const toggleChat = () => {
//     setChatOpen(!chatOpen);
//   };
//   return (
//     <Router basename="/Gym-Website">
//       <Switch>
//         <Route path="/admin-dashboard" component={AdminDashboardNav} />
//         <Route path="/trainer-dashboard" component={TrainerDashboardNav} />
//         <Route path="/user-dashboard" component={UserDashboardNav} />
//         <Route>
//           <Navbar />
//           <Switch>
//             <Route exact path="/" component={HomeNav} />
//             <Route exact path="/about" component={AboutNav} />
//             <Route exact path="/features" component={FeaturesNav} />
//             <Route exact path="/contact" component={ContactNav} />
//             <Route exact path="/sign-up" component={SignUpNav} />
//             <Route exact path="/login" component={SignInNav} />
//             <Route exact path="/admin-sign-up" component={AdminSignUpNav} />
           
  
//           </Switch>
//           <Footer />
          
//           <button className="chat-toggle-button" onClick={toggleChat}>
//             💬
//           </button>
//           {chatOpen && <GuestChat onClose={() => setChatOpen(false)} />}

//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './components/website/Navbar.css';
import './components/website/Banner.css';
import './components/website/GymClass.css';
import './components/website/About.css';
import './components/website/ChoseUs.css';
import './components/website/Team.css';
import './components/website/Subscribe.css';
import './components/website/MonthlyPlan.css';
import './components/website/BMI.css';
import './components/website/Testimonial.css';
import './components/website/Footer.css';
import './components/website/PageHeader.css';
import './components/website/Features.css';
import './components/website/Services.css';
import './components/website/Contact.css';
import './components/website/Auth.css';

import './responsive.css';
import './App.scss'; 

import Navbar from './components/website/Navbar';
import HomeNav from "./routes/HomeNav";
import AboutNav from "./routes/AboutNav";
import FeaturesNav from "./routes/FeaturesNav";
import ContactNav from "./routes/ContactNav";
import SignInNav from "./routes/SignInNav";
import SignUpNav from "./routes/SignUpNav";
import AdminDashboardNav from "./routes/AdminDashboardNav";
import Footer from './components/website/Footer';
import TrainerDashboardNav from "./routes/TrainerDashboardNav";
import UserDashboardNav from "./routes/UserDashboardNav";
import GuestChat from './components/adminDashboard/chat/guestChat';
import './components/adminDashboard/chat/chatstyles.css';

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router basename="/Gym-Website">
      <Switch>
        <Route path="/admin-dashboard" component={AdminDashboardNav} />
        <Route path="/trainer-dashboard" component={TrainerDashboardNav} />
        <Route path="/user-dashboard" component={UserDashboardNav} />
        <Route>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomeNav} />
            <Route exact path="/about" component={AboutNav} />
            <Route exact path="/features" component={FeaturesNav} />
            <Route exact path="/contact" component={ContactNav} />
            <Route exact path="/sign-up" component={SignUpNav} />
            <Route exact path="/login" component={SignInNav} />
         
          </Switch>
          <Footer />

          <button className="chat-toggle-button" onClick={toggleChat}>💬</button>
          {chatOpen && <GuestChat onClose={() => setChatOpen(false)} />}

       
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
