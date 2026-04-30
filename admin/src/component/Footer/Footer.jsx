import { Utensils } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="admin-footer">

      {/* ── Left: Brand + Copyright ── */}
      <div className="footer-left">
        <span className="footer-brand">
          <span className="footer-brand-icon" aria-hidden="true">
            <Utensils size={12} />
          </span>
          Roza Fast Food
        </span>
        <span className="footer-sep">·</span>
        <span className="footer-copy">© {year} All rights reserved</span>
        <span className="footer-sep hide-mobile">·</span>
        <div className="footer-links hide-mobile">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Support</a>
        </div>
      </div>

      {/* ── Right: Version + Theme Toggle ── */}
      <div className="footer-right">
        <div className="footer-status" title="All systems operational">
          <span className="footer-status-dot" />
          Operational
        </div>
        <span className="footer-sep">·</span>
        <span className="footer-version">v1.0.0</span>
        <span className="footer-sep">·</span>

        <button
          className="footer-theme-btn"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle color theme"
        >
          <span className="footer-theme-track" data-dark={isDarkMode}>
            <span className="footer-theme-thumb" />
          </span>
          <span className="footer-theme-label">
            {isDarkMode ? '🌙 Dark' : '☀️ Light'}
          </span>
        </button>
      </div>

    </footer>
  );
};

export default Footer;
