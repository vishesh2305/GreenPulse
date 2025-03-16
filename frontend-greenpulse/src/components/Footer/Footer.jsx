import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Medicines are substances used to prevent, diagnose, or treat diseases. They include prescription drugs, over-the-counter medications, generics, biologics, vaccines, herbal remedies, and topical treatments. They can relieve pain, manage chronic conditions, and combat infections. Proper use ensures effectiveness, while misuse can lead to resistance or side effects.</p>
            <div className="social-icons">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-whatsapp"></i>

          </div>
        </div>
        <div className="footer-content-center">
            <h2>Green Pulse</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Track Order</li>
                <li>Contact us</li>
            </ul>
        </div>
        <div className="footer-content-right">
        <h2>Get in touch</h2>
        <ul>
            <li>+91 9887533480</li>
            <br />
            <li>comingsoon@gmail.com</li>
        </ul>
        </div>
      </div>
      <hr />
      <p className="copyright">Copyright {new Date().getFullYear()} &copy; All rights reserved</p>
    </div>
  )
}

export default Footer
