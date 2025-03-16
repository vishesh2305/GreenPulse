import React, { useState } from 'react'
import "./Login.css"
const Login = ({setShowLogin}) => {
    const [currState,setCurrState]=useState("Sign Up")
  return (
    <div className='pop-up'>
        <form className="login-container">
            <div className="login-title">
                <h2>{currState}</h2>
                <p onClick={()=>setShowLogin(false)} className='cross-btn'>❌</p>
            </div>
        <div className="login-input">
            {currState==="Login"?<></>: <input type="text"  placeholder='Your Name' required />}
            <input type="email" placeholder='Your Email' required />
            <input type="password" placeholder='Password' required />
        </div>
        <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms and condition of user privacy and policy</p>
        </div>
        {currState==="Login"?
        <p>Create a new account ? <b><span onClick={()=>setCurrState("Sign up")}>  Click here</span></b></p>
        :<p>Already have an account?<b> <span onClick={()=>setCurrState("Login")}>  Login here</span></b></p>
        }
        </form>
    </div>
  )
}

export default Login
