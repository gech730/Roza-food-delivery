import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ handleLogout, onToggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="admin-navbar">
      {/* Menu toggle */}
      <button 
        className="nb-menu-btn" 
        onClick={onToggleSidebar} 
        title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="nb-search">
        <Search size={16} className="nb-search-ico" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Right side actions */}
      <div className="nb-right">
        {/* Theme toggle */}
        <button 
          className="nb-btn" 
          onClick={toggleTheme} 
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="nb-btn nb-notif">
          <Bell size={18} />
          <span className="nb-dot" />
        </button>

        <div className="nb-divider" />

        {/* Profile dropdown */}
        <div 
          className={`nb-profile ${dropdownOpen ? 'active' : ''}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <img src={assets.profile_icon} alt="Admin" className="nb-avatar" />
          <div className="nb-profile-info">
            <span className="nb-profile-name">Roza Admin</span>
            <span className="nb-profile-role">Superuser</span>
          </div>
          <ChevronDown size={14} className="nb-chevron" />

          <div className="nb-dropdown">
            <div className="nb-drop-header">
              <img src={assets.profile_icon} alt="Admin" className="nb-drop-avatar" />
              <div>
                <span className="nb-drop-name">Admin</span>
                <span className="nb-drop-email">admin@roza.com</span>
              </div>
            </div>
            <div className="nb-drop-divider" />
            <div className="nb-drop-item" onClick={() => { navigate('/settings'); setDropdownOpen(false); }}>
              <Settings size={16} />
              <span>Settings</span>
            </div>
            <div className="nb-drop-divider" />
            <div className="nb-drop-item danger" onClick={handleLogout}>
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
