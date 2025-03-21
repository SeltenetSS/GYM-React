
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './components/Navbar.css'
import './components/Banner.css'
import './components/GymClass.css'
import './components/About.css'
import './components/ChoseUs.css'
import './components/Team.css'
import './components/Subscribe.css'
import './components/MonthlyPlan.css'
import './components/BMI.css'
import './components/Testimonial.css'
import './components/Footer.css'
import './components/PageHeader.css'
import './components/Features.css'
import './components/Services.css'
import './components/Contact.css'
import './components/Auth.css'

import './responsive.css'

import Navbar from './components/Navbar';
import HomeNav from "./routes/HomeNav";
import AboutNav from "./routes/AboutNav";
import FeaturesNav from "./routes/FeaturesNav";
import ContactNav from "./routes/ContactNav";
import SignInNav from "./routes/SignInNav";
import SignUpNav from "./routes/SignUpNav";
import AdminSignUpNav from "./routes/AdminSignUpNav";
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard'; // AdminDashboard componenti
import TrainerDashboard from './components/TrainerDashboard'; // TrainerDashboard componenti
import UserDashboard from './components/UserDashboard'; // UserDashboard componenti
import SignIn from "./components/SignIn";
import SignUp from"./components/Signup"
// import SignUpAdmin from "./components/AdminSignUp"




function App() {
  return (
    <Router basename="/Gym-Website"> 
      <Navbar />

      <Switch>
        <Route exact path="/" component={HomeNav}></Route>
        <Route exact path="/about" component={AboutNav}></Route>
        <Route exact path="/features" component={FeaturesNav}></Route>
        <Route exact path="/contact" component={ContactNav}></Route>
        <Route exact path="/sign-up" component={SignUpNav}></Route>
        <Route exact path="/login" component={SignInNav}></Route>
        <Route exact path="/login" component={SignIn} ></Route>
        <Route exact path="/sign-up" component={SignUp} ></Route>
        {/* <Route exact path="/admin-sign-up" component={SignUpAdmin} ></Route> */}
        <Route exact path="/admin-sign-up" component={AdminSignUpNav} ></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;

