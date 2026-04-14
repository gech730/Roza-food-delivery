import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Dashboard.css';

const STATUS_COLOR = {
  pending:'#f59e0b', paid:'#3b82f6', preparing:'#f97316',
  out_for_delivery:'#8b5cf6', delivered:'#22c55e', cancelled:'#ef4444',
};

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="dash-stat" style={{ borderLeft: `4px solid ${color}` }}>
    <div className="dash-stat-icon" style={{ background: color + '18' }}>{icon}</div>
    <div className="dash-stat-body">
      <p className="dash-stat-label">{label}</p>
      <p className="dash-stat-value">{value}</p>
      {sub && <p className="dash-stat-sub">{sub}</p>}
    </div>
  </div>
);

const Dashboard = ({ url, token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}/api/admin/dashboard`, { headers: { token } })
      .then(r => { if (r.data.success) setStats(r.data.data); else toast.error(r.data.message); })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="a-spinner-wrap"><div className="a-spinner" /></div>;
  if (!stats)  return <p style={{ color: 'var(--muted)' }}>No data.</p>;

  return (
    <div className="dashboard" style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Dashboard</h1><p>Welcome back — here's what's happening today.</p></div>
      </div>

      {/* Stats */}
      <div className="dash-stats-grid">
        <StatCard icon="📦" label="Total Orders"   value={stats.totalOrders}                    sub={`+${stats.monthOrders} this month`} color="#f97316" />
        <StatCard icon="💰" label="Total Revenue"  value={`$${stats.totalRevenue?.toFixed(2)}`} sub={`$${stats.monthRevenue?.toFixed(2)} this month`} color="#22c55e" />
        <StatCard icon="👥" label="Total Users"    value={stats.totalUsers}                     color="#3b82f6" />
        <StatCard icon="🍽️" label="Menu Items"    value={stats.totalFoods}                     color="#8b5cf6" />
      </div>

      <div className="dash-bottom-grid">
        {/* Orders by status */}
        <div className="a-card dash-status-card">
          <h3 className="dash-section-title">Orders by Status</h3>
          <div className="dash-status-list">
            {stats.ordersByStatus.length === 0 && <p style={{ color: 'var(--muted)', fontSize: 13 }}>No orders yet.</p>}
            {stats.ordersByStatus.map(s => (
              <div key={s._id} className="dash-status-row">
                <span className="dash-status-dot" style={{ background: STATUS_COLOR[s._id] || '#aaa' }} />
                <span className="dash-status-name">{s._id?.replace(/_/g, ' ')}</span>
                <div className="dash-status-bar-wrap">
                  <div className="dash-status-bar" style={{ width: `${Math.min((s.count / stats.totalOrders) * 100, 100)}%`, background: STATUS_COLOR[s._id] || '#aaa' }} />
                </div>
                <span className="dash-status-count">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="a-card dash-recent-card">
          <h3 className="dash-section-title">Recent Orders</h3>
          {stats.recentOrders.length === 0
            ? <p style={{ color: 'var(--muted)', fontSize: 13 }}>No recent orders.</p>
            : (
              <table className="a-table">
                <thead><tr><th>Order</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {stats.recentOrders.map(o => (
                    <tr key={o._id}>
                      <td><strong>#{o._id.slice(-6).toUpperCase()}</strong></td>
                      <td>{o.items.length} item{o.items.length !== 1 ? 's' : ''}</td>
                      <td style={{ color: 'var(--brand)', fontWeight: 700 }}>${o.totalPrice}</td>
                      <td>
                        <span className="a-badge" style={{ background: (STATUS_COLOR[o.status] || '#aaa') + '18', color: STATUS_COLOR[o.status] || '#aaa' }}>
                          {o.status?.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
