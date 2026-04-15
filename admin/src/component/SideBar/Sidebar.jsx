import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const NAV = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/orders',    icon: '📦', label: 'Orders' },
  { to: '/users',     icon: '👥', label: 'Users' },
  { to: '/list',      icon: '🍽️', label: 'Products' },
  { to: '/add',       icon: '➕', label: 'Add Product' },
  { to: '/payments',  icon: '💳', label: 'Payments' },
  { to: '/settings',  icon: '⚙️', label: 'Settings' },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Brand + close button */}
      <div className="sb-header">
        <div className="sb-brand">
          <div className="sb-brand-icon">🍛</div>
          <div className="sb-brand-text">
            <span className="sb-brand-name">Roza Admin</span>
            <span className="sb-brand-sub">Food Delivery</span>
          </div>
        </div>
        {/* ✕ close button — always visible */}
        <button className="sb-close" onClick={onClose} title="Close sidebar">
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav className="sb-nav">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sb-link${isActive || (to === '/dashboard' && location.pathname === '/') ? ' active' : ''}`
            }
          >
            <span className="sb-icon">{icon}</span>
            <span className="sb-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sb-footer">Roza Fast Food © 2025</div>
    </aside>
  );
};

export default Sidebar;
