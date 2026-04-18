import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Users, List as ListIcon,
  PlusCircle, CreditCard, Settings, X
} from 'lucide-react';
import './Sidebar.css';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders',    icon: ShoppingBag,     label: 'Orders' },
  { to: '/users',     icon: Users,           label: 'Users' },
  { to: '/list',      icon: ListIcon,        label: 'Products' },
  { to: '/add',       icon: PlusCircle,      label: 'Add Product' },
  { to: '/payments',  icon: CreditCard,      label: 'Payments' },
  { to: '/settings',  icon: Settings,        label: 'Settings' },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>

      {/* Header — logo + close button */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🍛</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">Roza Admin</span>
            <span className="sidebar-logo-sub">Food Delivery</span>
          </div>
        </div>
        {/* Close button — always visible so user can close on any screen */}
        <button className="sidebar-close" onClick={onClose} title="Close sidebar">
          <X size={18} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        {NAV.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || (to === '/dashboard' && location.pathname === '/');
          return (
            <NavLink
              key={to}
              to={to}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="sidebar-link-icon" size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="sidebar-link-label">{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <span>Roza Fast Food © 2025</span>
      </div>

    </aside>
  );
};

export default Sidebar;
