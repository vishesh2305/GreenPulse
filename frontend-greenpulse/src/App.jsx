import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";


import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import BlogList from "./pages/Blog/BlogList";
import { AuthProvider } from "./assets/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";

axios.defaults.withCredentials = true;
import LandingPage from "./pages/Landing/LandingPage";
<<<<<<< HEAD
import BlogContent from "./pages/Blog/BlogContentPage/BlogContent";
=======
import OtpVerification from "./pages/OtpVerification";
import ContentSection16 from "./pages/Blog/BlogContentPage/BlogContent";

>>>>>>> 9e3b058465bdd25637c4e4e6799338e56591fa76
function App() {
  return (
    <div>
      <AuthProvider>
      <Router>
        <Routes>
  
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/otp-verification" element={<OtpVerification/>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blog-list" element={<BlogList />}></Route>
<<<<<<< HEAD
          <Route path="/blog/:id" element={<BlogContent />}></Route>
=======
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="./blog-list/BlogContentPage/BlogContent" element={<ContentSection16 />} />
>>>>>>> 9e3b058465bdd25637c4e4e6799338e56591fa76
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
