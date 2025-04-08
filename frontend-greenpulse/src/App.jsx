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
import BlogContent from "./pages/Blog/BlogContentPage/BlogContent";
import OtpVerification from "./pages/OtpVerification";
import ContentSection16 from "./pages/Blog/BlogContentPage/BlogContent";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/place-order/Place-Order";
import Footer from "./components/Footer/Footer";
import AddPhoto from "./pages/addphoto/AddPhoto";
import NewHome from "./pages/newHome/newHome";

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
          <Route path="/newhome" element={<NewHome/>}></Route>
          <Route path="/blog/:id" element={<BlogContent />}></Route>

          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="./blog-list/BlogContentPage/BlogContent" element={<ContentSection16 />} />


          <Route path='/marketplace' element={<MarketPlace/>}/>
        <Route path='/add-photo/:name' element={<AddPhoto/>}  />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="./blog-list/BlogContentPage/BlogContent" element={<ContentSection16 />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
