import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants/homeData';

const Footer = () => {
  return (
    <footer className="footer-section" id="footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Blurb Column */}
          <div className="footer-col footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">🍲</div>
              <div className="footer-logo-text">
                <span className="footer-brand-name">Roza</span>
                <span className="footer-brand-sub">Fast Food</span>
              </div>
            </Link>

            <p className="footer-blurb">
              Roza Fast Food brings you the authentic soul of Ethiopian cuisine. Freshly baked 100% teff injera, fragrant berbere stews, and prime sizzled meats prepared with heritage care and delivered with modern speed across Addis Ababa.
            </p>

            <div className="footer-social-row">
              {CONTACT_INFO.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-icon"
                  aria-label={soc.name}
                >
                  <span>{soc.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (Separate Pages) */}
          <div className="footer-col">
            <h4 className="footer-heading">Pages</h4>
            <ul className="footer-list">
              <li>
                <Link to="/" className="footer-nav-link">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="footer-nav-link">Our Menu</Link>
              </li>
              <li>
                <Link to="/about" className="footer-nav-link">Meet Roza (About)</Link>
              </li>
              <li>
                <Link to="/services" className="footer-nav-link">Services & Pricing</Link>
              </li>
              <li>
                <Link to="/reviews" className="footer-nav-link">Customer Reviews</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-nav-link">Contact & Orders</Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Menu Highlights</h4>
            <ul className="footer-list">
              <li>
                <Link to="/menu?category=Injera%20%26%20Stews" className="footer-nav-link">
                  Injera & Stews (Wot)
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Tibs" className="footer-nav-link">
                  Sizzling Tibs
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Kitfo" className="footer-nav-link">
                  Traditional Kitfo
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Fasting%20Food" className="footer-nav-link">
                  Vegan Fasting (Beyaynetu)
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-nav-link">
                  Family Platters
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Drinks" className="footer-nav-link">
                  Beverages & Coffee
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Addis</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">📍</span>
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <div>
                  <a href={`tel:${CONTACT_INFO.phones[0]}`}>{CONTACT_INFO.phones[0]}</a>
                  <br />
                  <a href={`tel:${CONTACT_INFO.phones[1]}`}>{CONTACT_INFO.phones[1]}</a>
                </div>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </li>
              <li>
                <span className="contact-icon">🕒</span>
                <span>{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Roza Fast Food Delivery. All rights reserved. Made with ❤️ in Addis Ababa.
          </p>
          <div className="footer-legal-links">
            <Link to="/about">About Us</Link>
            <span className="dot-sep">•</span>
            <Link to="/contact">Support</Link>
            <span className="dot-sep">•</span>
            <Link to="/services">Delivery Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
