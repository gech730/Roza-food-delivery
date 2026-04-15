import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ handleLogout, onMenuToggle, sidebarOpen }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');

  return (
    <header className="admin-navbar">

      {/* ☰ toggle — opens sidebar when it's closed */}
      <button className="nb-menu-btn" onClick={onMenuToggle} title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {sidebarOpen
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        }
      </button>

      {/* Search */}
      <div className="nb-search">
        <svg className="nb-search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Right side — always visible, fixed top-right */}
      <div className="nb-right">

        {/* Theme toggle */}
        <button className="nb-btn" onClick={toggleTheme} title={isDarkMode ? 'Light mode' : 'Dark mode'}>
          {isDarkMode
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>

        {/* Notification */}
        <button className="nb-btn nb-notif">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="nb-dot" />
        </button>

        <div className="nb-sep" />

        {/* Profile — fixed top-right */}
        <div className="nb-profile">
          <img src={assets.profile_icon} alt="Admin" className="nb-avatar" />
          <div className="nb-profile-text">
            <span className="nb-name">Admin</span>
            <span className="nb-role">Super Admin</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--muted)', flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>

          {/* Dropdown */}
          <div className="nb-dropdown">
            <div className="nb-drop-item" onClick={() => navigate('/settings')}>
              ⚙️ Settings
            </div>
            <div className="nb-drop-divider" />
            <div className="nb-drop-item danger" onClick={handleLogout}>
              🚪 Sign Out
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
