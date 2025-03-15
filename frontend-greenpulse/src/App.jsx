import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";



import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import BlogList from "./pages/Blog/BlogList";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blog-list" element={<BlogList />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
