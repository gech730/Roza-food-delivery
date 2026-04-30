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
            <span className="footer-logo-name">ሮዛ ምግብ ማድረሻ</span>
            <span className="footer-logo-tagline">የሀገር በቀል ጣዕም</span>
          </div>
        </div>
        <p>ልዩ እና የረቀቀ የኢትዮጵያ ምግብ በፍጥነት እቤቶ ድረስ እናቀርባለን።</p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><img src={assets.facebook_icon} alt="Facebook" /></a>
          <a href="#" aria-label="Twitter"><img src={assets.twitter_icon} alt="Twitter" /></a>
          <a href="#" aria-label="LinkedIn"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
        </div>
      </div>

      <div className="footer-links">
        <h4>ኩባንያ</h4>
        <ul>
          <li><Link to="/">መነሻ</Link></li>
          <li><a href="#explorer-menu">ምናሌ</a></li>
          <li><Link to="/contact">አድራሻችን</Link></li>
          <li><a href="#">የግላዊነት መመሪያ</a></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>ያግኙን</h4>
        <ul>
          <li>📞 +251 911 23 45 67</li>
          <li>✉️ info@rozafood.com</li>
          <li>📍 አዲስ አበባ፣ ኢትዮጵያ</li>
          <li>🕐 ክፍት ነው: 12:00 LT – 4:00 LT</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 ሮዛ ምግብ ማድረሻ. መብቱ በህግ የተጠበቀ ነው።</p>
      <p>በኢትዮጵያ የተሰራ ❤️</p>
    </div>
  </footer>
);

export default Footer;
