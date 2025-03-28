

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './components/Navbar.css';
import './components/Banner.css';
import './components/GymClass.css';
import './components/About.css';
import './components/ChoseUs.css';
import './components/Team.css';
import './components/Subscribe.css';
import './components/MonthlyPlan.css';
import './components/BMI.css';
import './components/Testimonial.css';
import './components/Footer.css';
import './components/PageHeader.css';
import './components/Features.css';
import './components/Services.css';
import './components/Contact.css';
import './components/Auth.css';
import './App.scss';
import './responsive.css';

import Navbar from './components/Navbar';
import HomeNav from "./routes/HomeNav";
import AboutNav from "./routes/AboutNav";
import FeaturesNav from "./routes/FeaturesNav";
import ContactNav from "./routes/ContactNav";
import SignInNav from "./routes/SignInNav";
import SignUpNav from "./routes/SignUpNav";
import AdminSignUpNav from "./routes/AdminSignUpNav";
import AdminDashboardNav from "./routes/AdminDashboardNav";
import Footer from './components/Footer';

import TrainerDashboard from './components/TrainerDashboard'; 
import UserDashboard from './components/UserDashboard'; 

function App() {
  return (
    <Router basename="/Gym-Website">
      <Switch>
        {/* AdminDashboard səhifəsi üçün Navbar və Footer-ı gizlət */}
        <Route path="/admin-dashboard">
          {/* Admin Dashboard üçün öz komponent */}
          <AdminDashboardNav />
        </Route>
        
        {/* Digər səhifələrdə Navbar və Footer göstərilir */}
        <Route path="/">
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomeNav} />
            <Route exact path="/about" component={AboutNav} />
            <Route exact path="/features" component={FeaturesNav} />
            <Route exact path="/contact" component={ContactNav} />
            <Route exact path="/sign-up" component={SignUpNav} />
            <Route exact path="/login" component={SignInNav} />
            <Route exact path="/admin-sign-up" component={AdminSignUpNav} />
            <Route exact path="/trainer-dashboard" component={TrainerDashboard} />
            <Route exact path="/user-dashboard" component={UserDashboard} />
          </Switch>
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
