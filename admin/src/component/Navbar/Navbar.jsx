import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, Bell, Settings as SettingsIcon, LogOut, X } from 'lucide-react';
import axios from 'axios';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ handleLogout, sidebarOpen, onToggleSidebar, url, token }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showNotif, setShowNotif]   = useState(false);
  const [notifs, setNotifs]         = useState([]);
  const [unread, setUnread]         = useState(0);

  // Fetch recent orders as notifications
  useEffect(() => {
    if (!url || !token) return;
    const load = async () => {
      try {
        const res = await axios.post(`${url}/api/order/list?page=1&limit=5`, {}, { headers: { token } });
        if (res.data.success) {
          setNotifs(res.data.data);
          setUnread(res.data.data.filter(o => o.status === 'pending').length);
        }
      } catch { /* silent */ }
    };
    load();
    const interval = setInterval(load, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, [url, token]);

  const STATUS_COLOR = {
    pending: '#f59e0b', paid: '#3b82f6', preparing: '#f97316',
    out_for_delivery: '#8b5cf6', delivered: '#22c55e', cancelled: '#ef4444',
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        <button className="nb-toggle" onClick={onToggleSidebar} title="Toggle sidebar">
          <Menu size={22} />
        </button>
        <span className="navbar-brand">Roza Admin</span>
      </div>

      <div className="navbar-right">
        {/* Notifications */}
        <div className="nb-notif-wrap">
          <button
            className="nb-icon-btn"
            onClick={() => setShowNotif(v => !v)}
            title="Notifications"
          >
            <Bell size={20} />
            {unread > 0 && <span className="nb-badge">{unread > 9 ? '9+' : unread}</span>}
          </button>

          {showNotif && (
            <div className="nb-notif-panel">
              <div className="nb-notif-header">
                <span>Notifications</span>
                <button onClick={() => setShowNotif(false)}><X size={16} /></button>
              </div>
              {notifs.length === 0 ? (
                <div className="nb-notif-empty">No recent orders</div>
              ) : (
                notifs.map(o => (
                  <div
                    key={o._id}
                    className="nb-notif-item"
                    onClick={() => { navigate('/orders'); setShowNotif(false); }}
                  >
                    <div
                      className="nb-notif-dot"
                      style={{ background: STATUS_COLOR[o.status] || '#aaa' }}
                    />
                    <div className="nb-notif-body">
                      <p className="nb-notif-title">
                        Order #{o._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="nb-notif-sub">
                        {o.shippingAddress?.fullName || '—'} · ${o.totalPrice}
                      </p>
                      <p className="nb-notif-status" style={{ color: STATUS_COLOR[o.status] }}>
                        {o.status?.replace(/_/g, ' ')}
                      </p>
                    </div>
                    <span className="nb-notif-time">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
              <div className="nb-notif-footer" onClick={() => { navigate('/orders'); setShowNotif(false); }}>
                View all orders →
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button className="nb-icon-btn" onClick={toggleTheme} title={isDarkMode ? 'Light mode' : 'Dark mode'}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="nb-divider" />

        {/* Profile */}
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="Admin" className="nb-avatar" />
          <div className="nb-profile-info">
            <span className="nb-profile-name">Roza Admin</span>
            <span className="nb-profile-role">Superuser</span>
          </div>

          <div className="nb-dropdown">
            <div className="nb-dropdown-item" onClick={() => navigate('/settings')}>
              <SettingsIcon size={16} />
              <span>Settings</span>
            </div>
            <div className="nb-dropdown-divider" />
            <div className="nb-dropdown-item danger" onClick={handleLogout}>
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
