import React, { useState, useContext, useEffect, useRef } from 'react';
import './Navarbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * Sun Icon SVG
 */
const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

/**
 * Moon Icon SVG
 */
const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/**
 * Hamburger Menu Icon
 */

const HamburgerIcon = ({ isOpen }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </>
    )}
  </svg>
);


const Navarbar = ({ setShowLogin }) => {

  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, cartItems, token, logout, userInfo, url } = useContext(StoreContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
// user logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  /**
   * Get Profile Image URL
   */
  useEffect(()=>{

    getProfileImageUrl();
    
  },[token])
  const getProfileImageUrl = () => {
    if (userInfo?.profileImage) {
      return `${url}/images/${userInfo.profileImage}`;
    }
    return null;
  };

  return (
    <div className='navbar'>

 {/* Hamburger Menu Button (Mobile) */}
      <button 
        className="hamburger-menu" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >

        <HamburgerIcon isOpen={mobileMenuOpen} />

      </button>

      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      
     

      {/* Navigation Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <Link 
          to='/' 
          onClick={() => {
            setMenu("home");
            setMobileMenuOpen(false);
          }} 

          className={menu === "home" ? "active" : ""}>
          Home
        </Link>

        <a 
          href='#explorer-menu' 
          onClick={() => {
            setMenu("menu");
            setMobileMenuOpen(false);
          }} 
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a 
          href='#app-download' 
          onClick={() => {
            setMenu("mobile-app");
            setMobileMenuOpen(false);
          }} 
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a 
          href='#footer' 
          onClick={() => {
            setMenu("contact-us");
            setMobileMenuOpen(false);
          }} 
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      {/* Right Side - Theme Toggle, Search, Cart, Profile */}

      <div className="navar-right">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        
        {/* Search Icon (Desktop only) */}
        <img src={assets.search_icon} alt="Search" className="search-icon" />
        
     
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        
        {/* Show Login or Profile Dropdown */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="sign-in-btn">Sign In</button>
        ) : (
          <div className="navbar-profile">
           
            {getProfileImageUrl() ? (
              <img src={getProfileImageUrl()} alt="Profile" className="profile-image" />
            ) : (
              <img src={assets.profile_icon} alt="Profile" />
            )}
            
            <ul className='nav-profile-dropdown'>
            
              <li onClick={() => {
                navigate("/profile");
                setMobileMenuOpen(false);
              }}>
                <img src={assets.profile_icon} alt="" />
                <p>Profile</p>
              </li>

              <hr />
           
              <li onClick={() => {
                navigate("/myOrder");
                setMobileMenuOpen(false);
              }}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
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
  );
};

export default Navarbar;
