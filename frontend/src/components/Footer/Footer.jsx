import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div
    className='footer' id='footer'>
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
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            
        </div>
         <div className="footer-content-right"></div>
    </div>
   
  )
}

export default Footer