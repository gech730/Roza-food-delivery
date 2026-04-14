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

const Sidebar = ({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🍛</div>
        {!collapsed && (
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Roza</span>
            <span className="sidebar-brand-sub">Admin Panel</span>
          </div>
        )}
        {/* Desktop collapse toggle */}
        <button
          className="sidebar-toggle desktop-only"
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '›' : '‹'}
        </button>
        {/* Mobile close button */}
        <button
          className="sidebar-toggle mobile-only"
          onClick={onCloseMobile}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `sidebar-link${isActive || (to === '/dashboard' && location.pathname === '/') ? ' active' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <span className="sidebar-link-icon">{icon}</span>
            {!collapsed && <span className="sidebar-link-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          Roza Fast Food © 2025
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
