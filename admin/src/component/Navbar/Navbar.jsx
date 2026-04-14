import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ handleLogout, onMobileMenuToggle, onDesktopToggle }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="admin-navbar">
      {/* Mobile hamburger — only visible on small screens */}
      <button className="navbar-btn mobile-menu-btn" onClick={onMobileMenuToggle} aria-label="Open menu">
        ☰
      </button>

      {/* Desktop collapse toggle — only visible on large screens */}
      <button className="navbar-btn desktop-collapse-btn" onClick={onDesktopToggle} aria-label="Collapse sidebar">
        ☰
      </button>

      <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
        <span>🍛</span>
        <span className="navbar-brand-name">Roza Admin</span>
      </div>

      <div className="navbar-right">
        <button className="navbar-btn" onClick={toggleTheme} title={isDarkMode ? 'Light mode' : 'Dark mode'}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="Admin" className="navbar-avatar" />
          <div className="navbar-dropdown">
            <div className="navbar-dropdown-item" onClick={() => navigate('/settings')}>
              ⚙️ Settings
            </div>
            <div className="navbar-dropdown-item danger" onClick={handleLogout}>
              🚪 Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
