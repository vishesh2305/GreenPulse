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

function App() {
  return (
    <div>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blog-list" element={<BlogList />}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
