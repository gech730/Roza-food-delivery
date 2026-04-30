import React, { useState, useContext, useEffect, useRef } from 'react';
import './Navarbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const HamburgerIcon = ({ isOpen }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    {isOpen
      ? (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>)
      : (<><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>)
    }
  </svg>
);

const Navarbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, logout, userInfo, url, language, setLanguage, labels } = useContext(StoreContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const close = () => setMobileMenuOpen(false);
  const handleLogout = () => { logout(); navigate('/'); };
  const profileImg = userInfo?.profileImage ? `${url}/images/${userInfo.profileImage}` : null;
  const isHome = location.pathname === '/';

  // Scroll to section — if not on home, navigate home first then scroll
  const scrollTo = (sectionId) => {
    close();
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      // Wait for home to mount then scroll
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <nav className='navbar'>
      {/* Hamburger (mobile only) */}
      <button className="hamburger-menu" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Toggle menu">
        <HamburgerIcon isOpen={mobileMenuOpen} />
      </button>

      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={close}>
        <div className="navbar-logo-icon">🍲</div>
        <div className="navbar-logo-text">
          <span className="navbar-logo-name">{labels.nav.brandName}</span>
          <span className="navbar-logo-sub">{labels.nav.brandSub}</span>
        </div>
      </Link>

      {/* Nav links */}
      <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <Link
          to="/"
          onClick={close}
          className={isHome && location.hash === '' ? 'active' : ''}
        >
          {labels.nav.home}
        </Link>

        <button
          className={`nav-scroll-btn ${isHome && location.hash === '#explorer-menu' ? 'active' : ''}`}
          onClick={() => scrollTo('explorer-menu')}
        >
          {labels.nav.menu}
        </button>

        <Link
          to="/contact"
          onClick={close}
          className={location.pathname === '/contact' ? 'active' : ''}
        >
          {labels.nav.contact}
        </Link>

        {token && (
          <Link
            to="/myOrders"
            onClick={close}
            className={location.pathname === '/myOrders' ? 'active' : ''}
          >
            {labels.nav.myOrders}
          </Link>
        )}
      </ul>

      {/* Right side */}
      <div className="navar-right">
        <div className="language-switch">
          <button
            type="button"
            className={language === 'am' ? 'active' : ''}
            onClick={() => setLanguage('am')}
          >
            AM
          </button>
          <button
            type="button"
            className={language === 'en' ? 'active' : ''}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>

        <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? labels.nav.lightMode : labels.nav.darkMode}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="navbar-cart">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'} />
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)} className="sign-in-btn">{labels.nav.signIn}</button>
        ) : (
          <div className="navbar-profile">
            {profileImg
              ? <img src={profileImg} alt="Profile" className="profile-image" />
              : <img src={assets.profile_icon} alt="Profile" />
            }
            <ul className="nav-profile-dropdown">
              <li onClick={() => { navigate('/profile'); close(); }}>
                <img src={assets.profile_icon} alt="" /><p>{labels.nav.profile}</p>
              </li>
              <hr />
              <li onClick={() => { navigate('/myOrders'); close(); }}>
                <img src={assets.bag_icon} alt="" /><p>{labels.nav.myOrders}</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="" /><p>{labels.nav.logout}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navarbar;
