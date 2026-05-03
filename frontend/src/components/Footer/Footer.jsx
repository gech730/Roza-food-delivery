import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='footer' id='footer'>
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="footer-logo-icon">🍲</div>
          <div>
            <span className="footer-logo-name">Roza Food Delivery</span>
            <span className="footer-logo-tagline">Authentic local flavor</span>
          </div>
        </div>
        <p>Carefully prepared Ethiopian cuisine brought quickly to your door.</p>
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
          <li><Link to="/contact">Contact</Link></li>
          <li><a href="#">Privacy policy</a></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Contact</h4>
        <ul>
          <li>📞 +251 911 23 45 67</li>
          <li>✉️ info@rozafood.com</li>
          <li>📍 Addis Ababa, Ethiopia</li>
          <li>🕐 Open: 12:00 – 16:00 (local)</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 Roza Food Delivery. All rights reserved.</p>
      <p>Made with care in Ethiopia ❤️</p>
    </div>
  </footer>
);

export default Footer;
