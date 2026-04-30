import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Utensils,
} from 'lucide-react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ handleLogout, onToggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [search, setSearch]           = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="admin-navbar">

      {/* ── Left: Toggle + Mobile Brand ── */}
      <div className="nb-left">
        <button
          className="nb-menu-btn"
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>

        {/* Only visible on mobile (hidden on desktop via CSS) */}
        <div className="nb-brand">
          <div className="nb-brand-icon">
            <Utensils size={16} />
          </div>
          <div>
            <span className="nb-brand-name">Roza</span>
          </div>
        </div>
      </div>

      {/* ── Center: Search ── */}
      <div className="nb-search">
        <Search size={15} className="nb-search-ico" />
        <input
          type="text"
          placeholder="Search orders, users, products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search"
        />
      </div>

      {/* ── Right: Actions ── */}
      <div className="nb-right">

        {/* Theme Toggle */}
        <button
          className="nb-btn theme-btn"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
        >
          {isDarkMode
            ? <Sun size={18} strokeWidth={2} />
            : <Moon size={18} strokeWidth={2} />
          }
        </button>

        {/* Notifications */}
        <button className="nb-btn nb-notif" aria-label="Notifications">
          <Bell size={18} strokeWidth={2} />
          <span className="nb-dot" />
        </button>

        <div className="nb-divider" />

        {/* Profile Dropdown */}
        <div
          className={`nb-profile ${dropdownOpen ? 'active' : ''}`}
          onClick={() => setDropdownOpen(o => !o)}
          onMouseLeave={() => setDropdownOpen(false)}
          role="button"
          tabIndex={0}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <img src={assets.profile_icon} alt="Admin avatar" className="nb-avatar" />
          <div className="nb-profile-info">
            <span className="nb-profile-name">Roza Admin</span>
            <span className="nb-profile-role">Superuser</span>
          </div>
          <ChevronDown size={14} className="nb-chevron" />

          {/* Dropdown */}
          <div className="nb-dropdown" role="menu">
            <div className="nb-drop-header">
              <img src={assets.profile_icon} alt="Admin" className="nb-drop-avatar" />
              <div>
                <span className="nb-drop-name">Admin</span>
                <span className="nb-drop-email">admin@roza.com</span>
              </div>
            </div>

            <div className="nb-drop-divider" />

            <div
              className="nb-drop-item"
              role="menuitem"
              onClick={e => { e.stopPropagation(); navigate('/settings'); setDropdownOpen(false); }}
            >
              <Settings size={16} />
              <span>Settings</span>
            </div>

            <div className="nb-drop-divider" />

            <div
              className="nb-drop-item danger"
              role="menuitem"
              onClick={e => { e.stopPropagation(); handleLogout(); }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
