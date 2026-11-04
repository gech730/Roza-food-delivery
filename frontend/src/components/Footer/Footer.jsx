import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants/homeData';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              Roza Fast Food brings you the authentic soul of Ethiopian cuisine. Freshly baked 100% teff injera, fragrant berbere stews, and prime sizzled meats prepared with heritage care and delivered with modern speed.
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

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li>
                <button type="button" onClick={() => scrollTo('hero')} className="footer-nav-link">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">
                  Our Menu
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('about')} className="footer-nav-link">
                  Meet Roza (About)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('services')} className="footer-nav-link">
                  Services & Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('reviews')} className="footer-nav-link">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('contact')} className="footer-nav-link">
                  Contact & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Categories Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Menu Highlights</h4>
            <ul className="footer-list">
              <li><button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">Injera & Stews (Wot)</button></li>
              <li><button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">Sizzling Tibs</button></li>
              <li><button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">Traditional Kitfo</button></li>
              <li><button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">Vegan Fasting (Beyaynetu)</button></li>
              <li><button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">Family Platters</button></li>
              <li><button type="button" onClick={() => scrollTo('menu')} className="footer-nav-link">Beverages & Coffee</button></li>
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
            <a href="#privacy">Privacy Policy</a>
            <span className="dot-sep">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="dot-sep">•</span>
            <a href="#security">Delivery Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
