import React, { useState, useContext, useEffect, useRef } from 'react';
import './Navarbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const SunIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const HamburgerIcon = ({ isOpen }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </>
    ) : (
      <>
        <line x1="3" y1="7" x2="21" y2="7"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="17" x2="21" y2="17"/>
      </>
    )}
  </svg>
);

const Navarbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalCartAmount, token, logout, userInfo, url } = useContext(StoreContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  const isHome = location.pathname === '/';

  // Handle scroll state for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Call once initially
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close drawer on click outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const close = () => setMobileMenuOpen(false);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileImg = userInfo?.profileImage ? `${url}/images/${userInfo.profileImage}` : null;

  // Smooth scroll helper
  const scrollTo = (sectionId) => {
    close();
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <header className={`header-navbar-wrapper ${isScrolled ? 'is-scrolled' : 'is-transparent'} ${!isHome ? 'is-solid-always' : ''}`}>
      <div className="navbar-inner">
        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          <HamburgerIcon isOpen={mobileMenuOpen} />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={close}>
          <div className="navbar-logo-icon">🍲</div>
          <div className="navbar-logo-text">
            <span className="navbar-logo-name">Roza</span>
            <span className="navbar-logo-sub">Fast Food</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav
          className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}
          ref={menuRef}
          aria-label="Main menu"
        >
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollTo('hero')}
          >
            Home
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollTo('menu')}
          >
            Menu
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollTo('about')}
          >
            About
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollTo('reviews')}
          >
            Reviews
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollTo('contact')}
          >
            Contact
          </button>

          {token && (
            <Link to="/myOrders" onClick={close} className="nav-link-btn nav-link-mobile-only">
              My Orders
            </Link>
          )}

          {/* Highlighted Order Now button inside mobile drawer */}
          <div className="mobile-drawer-cta">
            <Link to="/order" onClick={close} className="nav-order-now-btn">
              Order Now
            </Link>
          </div>
        </nav>

        {/* Right Action Icons & CTA */}
        <div className="navbar-right">
          {/* Highlighted Order Now Button on Desktop */}
          <Link to="/order" className="nav-order-now-btn desktop-cta">
            Order Now
          </Link>

          {/* Theme Switcher */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark/light mode"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Cart Basket */}
          <div className="navbar-cart">
            <Link to="/cart" aria-label="Shopping Cart">
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            {getTotalCartAmount() > 0 && <span className="cart-badge-dot" />}
          </div>

          {/* User Auth / Profile */}
          {!token ? (
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="sign-in-btn"
            >
              Sign In
            </button>
          ) : (
            <div className="navbar-profile">
              {profileImg ? (
                <img src={profileImg} alt="Profile" className="profile-image" />
              ) : (
                <img src={assets.profile_icon} alt="Profile" />
              )}
              <ul className="nav-profile-dropdown">
                <li onClick={() => { navigate('/profile'); close(); }}>
                  <img src={assets.profile_icon} alt="" />
                  <p>Profile</p>
                </li>
                <hr />
                <li onClick={() => { navigate('/myOrders'); close(); }}>
                  <img src={assets.bag_icon} alt="" />
                  <p>My Orders</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navarbar;
