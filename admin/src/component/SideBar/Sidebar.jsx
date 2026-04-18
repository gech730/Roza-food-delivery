import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  PlusCircle, 
  CreditCard, 
  Settings,
  X,
  Utensils
} from 'lucide-react';
import './Sidebar.css';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders',    icon: Package, label: 'Orders' },
  { to: '/users',     icon: Users, label: 'Users' },
  { to: '/list',      icon: ShoppingBag, label: 'Products' },
  { to: '/add',       icon: PlusCircle, label: 'Add Product' },
  { to: '/payments',  icon: CreditCard, label: 'Payments' },
  { to: '/settings',  icon: Settings, label: 'Settings' },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      {/* Brand + close button */}
      <div className="sb-header">
        <div className="sb-brand">
          <div className="sb-brand-icon">
            <Utensils size={18} />
          </div>
          <div className="sb-brand-text">
            <span className="sb-brand-name">Roza Admin</span>
            <span className="sb-brand-sub">Food Delivery</span>
          </div>
        </div>
        <button className="sb-close" onClick={onClose} title="Close sidebar">
          <X size={16} />
        </button>
      </div>

      {/* Navigation section */}
      <div className="sb-section">
        <span className="sb-section-label">Menu</span>
        <nav className="sb-nav">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sb-link${isActive || (to === '/dashboard' && location.pathname === '/') ? ' active' : ''}`
              }
            >
              <span className="sb-icon">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span className="sb-label">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="sb-footer">
        <div className="sb-footer-content">
          <span className="sb-footer-text">Roza Fast Food</span>
          <span className="sb-footer-version">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
