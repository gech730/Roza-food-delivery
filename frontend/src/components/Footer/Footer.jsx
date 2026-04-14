import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='footer' id='footer'>
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="footer-logo-icon">🍛</div>
          <div>
            <span className="footer-logo-name">Roza Fast Food</span>
            <span className="footer-logo-tagline">Authentic Ethiopian Cuisine</span>
          </div>
        </div>
        <p>Bringing the rich, bold flavors of Ethiopia to your doorstep. Made fresh, delivered fast.</p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><img src={assets.facebook_icon} alt="Facebook" /></a>
          <a href="#" aria-label="Twitter"><img src={assets.twitter_icon} alt="Twitter" /></a>
          <a href="#" aria-label="LinkedIn"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
        </div>
      </div>

      <div className="footer-links">
        <h4>Company</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#explorer-menu">Menu</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Get in Touch</h4>
        <ul>
          <li>📞 +251 970 143 109</li>
          <li>✉️ hello@rozafastfood.com</li>
          <li>📍 Addis Ababa, Ethiopia</li>
          <li>🕐 Open: 8AM – 10PM</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 Roza Fast Food. All rights reserved.</p>
      <p>Made with ❤️ in Ethiopia</p>
    </div>
  </footer>
);

export default Footer;
