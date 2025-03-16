import React, { useState } from 'react'
import "./navbar.css"
import { assets } from '../../assets/assets'
import {Link} from "react-router-dom"
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home");
  return (
    <div className='navbar'>
      <img src={assets.logo} id='logo' alt="" />
      <ul className='navbar-menu'>
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home" ? "active":""}>home</Link>
        <a href='#explore-products' onClick={()=>setMenu("shop")} className={menu==="shop" ? "active":""}>shop</a>
        <a href='' onClick={()=>setMenu("track")} className={menu==="track" ? "active":""}>track-order</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us" ? "active":""}>contact-us</a>
      </ul>
      <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <Link to="/cart"><div className='navbar-search-icon'>
                <img src={assets.cart_icon} alt="" />
                <div className='dot'></div>
            </div></Link>
            {/* <button onClick={()=>setShowLogin(true)}>sign-in</button> */}
      </div>
    </div>
  )
}

export default Navbar
