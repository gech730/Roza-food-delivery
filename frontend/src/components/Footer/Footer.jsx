import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="div footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse pariatur quam quibusdam ipsum? Quo voluptas ut aspernatur voluptatum explicabo dolores possimus veritatis, quos non delectus repellendus aliquam sed fugit magnam!</p>
                <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>

            </div>
            <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li> Delivery</li>
                <li>Privacy policy</li>
            </ul>
            </div>
            <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>o970143109</li>
                <li>tomato@gmail.com</li>
            </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>copyright 2025@Tomato.com -All rights Reserved</p>
    </div>
   
  )
}

export default Footer