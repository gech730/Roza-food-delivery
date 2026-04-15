import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const STATUS_META = {
  pending:          { color: '#f59e0b', bg: '#fffbeb', label: 'Pending' },
  paid:             { color: '#3b82f6', bg: '#eff6ff', label: 'Confirmed' },
  preparing:        { color: '#f97316', bg: '#fff7ed', label: 'Preparing' },
  out_for_delivery: { color: '#8b5cf6', bg: '#f5f3ff', label: 'On the Way' },
  delivered:        { color: '#22c55e', bg: '#f0fdf4', label: 'Delivered' },
  cancelled:        { color: '#ef4444', bg: '#fef2f2', label: 'Cancelled' },
};

const fmt = (n) => new Intl.NumberFormat().format(n ?? 0);
const fmtMoney = (n) => `$${(n ?? 0).toFixed(2)}`;

// ── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, subPositive, accent, fillPct = 65 }) => (
  <div className="ds-stat">
    <div className="ds-stat-top">
      <div className="ds-stat-icon" style={{ background: accent + '18', color: accent }}>
        {icon}
      </div>
      <div className="ds-stat-info">
        <span className="ds-stat-label">{label}</span>
        <span className="ds-stat-value">{value}</span>
      </div>
    </div>
    {sub && (
      <div className={`ds-stat-sub ${subPositive ? 'positive' : ''}`}>
        <span>{subPositive ? '↑' : '→'}</span> {sub}
      </div>
    )}
    <div className="ds-stat-bar" style={{ background: accent + '18' }}>
      <div className="ds-stat-bar-fill" style={{ background: accent, width: `${fillPct}%` }} />
    </div>
  </div>
);

// ── Dashboard ──────────────────────────────────────────────────────────────────
const Dashboard = ({ url, token }) => {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/api/admin/dashboard`, { headers: { token } })
      .then(r => { if (r.data.success) setStats(r.data.data); else toast.error(r.data.message); })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="ds-loading">
      <div className="ds-loading-inner">
        <div className="a-spinner" />
        <p>Loading dashboard…</p>
      </div>
    </div>
  );

  if (!stats) return (
    <div className="ds-empty">
      <span>📊</span>
      <p>No data available yet.</p>
    </div>
  );

  const totalOrders = stats.totalOrders || 0;

  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <div className="ds-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back — here's your restaurant overview.</p>
        </div>
        <div className="ds-header-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="ds-stats">
        <StatCard
          icon="📦" label="Total Orders" value={fmt(stats.totalOrders)}
          sub={`+${stats.monthOrders} this month`} subPositive
          accent="#f97316"
          fillPct={Math.min(100, totalOrders > 0 ? (stats.monthOrders / totalOrders) * 100 * 3 : 40)}
        />
        <StatCard
          icon="💰" label="Total Revenue" value={fmtMoney(stats.totalRevenue)}
          sub={`${fmtMoney(stats.monthRevenue)} this month`} subPositive
          accent="#22c55e"
          fillPct={Math.min(100, stats.totalRevenue > 0 ? (stats.monthRevenue / stats.totalRevenue) * 100 * 3 : 40)}
        />
        <StatCard
          icon="👥" label="Registered Users" value={fmt(stats.totalUsers)}
          accent="#3b82f6" fillPct={72}
        />
        <StatCard
          icon="🍽️" label="Menu Items" value={fmt(stats.totalFoods)}
          accent="#8b5cf6" fillPct={55}
        />
      </div>

      {/* ── Middle row ── */}
      <div className="ds-mid">

        {/* Order Status Breakdown */}
        <div className="a-card ds-card">
          <div className="ds-card-header">
            <h3>Order Status</h3>
            <button className="ds-link" onClick={() => navigate('/orders')}>View all →</button>
          </div>
          {stats.ordersByStatus.length === 0 ? (
            <p className="ds-empty-text">No orders yet.</p>
          ) : (
            <div className="ds-status-list">
              {stats.ordersByStatus
                .sort((a, b) => b.count - a.count)
                .map(s => {
                  const meta = STATUS_META[s._id] || { color: '#aaa', bg: '#f5f5f5', label: s._id };
                  const pct  = totalOrders > 0 ? Math.round((s.count / totalOrders) * 100) : 0;
                  return (
                    <div key={s._id} className="ds-status-item">
                      <div className="ds-status-top">
                        <div className="ds-status-left">
                          <span className="ds-status-dot" style={{ background: meta.color }} />
                          <span className="ds-status-label">{meta.label}</span>
                        </div>
                        <div className="ds-status-right">
                          <span className="ds-status-count">{s.count}</span>
                          <span className="ds-status-pct">{pct}%</span>
                        </div>
                      </div>
                      <div className="ds-progress-track">
                        <div
                          className="ds-progress-fill"
                          style={{ width: `${pct}%`, background: meta.color }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Revenue Summary */}
        <div className="a-card ds-card ds-revenue-card">
          <div className="ds-card-header">
            <h3>Revenue Summary</h3>
          </div>
          <div className="ds-revenue-grid">
            <div className="ds-rev-item">
              <span className="ds-rev-label">Total Revenue</span>
              <span className="ds-rev-value" style={{ color: '#22c55e' }}>{fmtMoney(stats.totalRevenue)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">This Month</span>
              <span className="ds-rev-value" style={{ color: '#3b82f6' }}>{fmtMoney(stats.monthRevenue)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Total Orders</span>
              <span className="ds-rev-value">{fmt(stats.totalOrders)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">This Month</span>
              <span className="ds-rev-value">{fmt(stats.monthOrders)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Avg. Order Value</span>
              <span className="ds-rev-value" style={{ color: '#f97316' }}>
                {totalOrders > 0 ? fmtMoney(stats.totalRevenue / totalOrders) : '$0.00'}
              </span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Delivery Rate</span>
              <span className="ds-rev-value" style={{ color: '#22c55e' }}>
                {totalOrders > 0
                  ? `${Math.round(((stats.ordersByStatus.find(s => s._id === 'delivered')?.count || 0) / totalOrders) * 100)}%`
                  : '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="a-card ds-card ds-recent">
        <div className="ds-card-header">
          <h3>Recent Orders</h3>
          <button className="ds-link" onClick={() => navigate('/orders')}>View all →</button>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="ds-empty-text">No orders yet.</p>
        ) : (
          <>
            {/* Desktop table */}
            <table className="a-table ds-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(o => {
                  const meta = STATUS_META[o.status] || { color: '#aaa', bg: '#f5f5f5', label: o.status };
                  return (
                    <tr key={o._id}>
                      <td>
                        <span className="ds-order-id">#{o._id.slice(-7).toUpperCase()}</span>
                      </td>
                      <td>
                        <div className="ds-customer">
                          <div className="ds-avatar">
                            {(o.shippingAddress?.fullName?.[0] || '?').toUpperCase()}
                          </div>
                          <div>
                            <div className="ds-customer-name">{o.shippingAddress?.fullName || '—'}</div>
                            <div className="ds-customer-phone">{o.shippingAddress?.phone || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td>{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</td>
                      <td><span className="ds-amount">{fmtMoney(o.totalPrice)}</span></td>
                      <td>
                        <span className="ds-badge" style={{ background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="ds-date">
                        {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="ds-order-cards">
              {stats.recentOrders.map(o => {
                const meta = STATUS_META[o.status] || { color: '#aaa', bg: '#f5f5f5', label: o.status };
                return (
                  <div key={o._id} className="ds-order-card">
                    <div className="ds-order-card-top">
                      <span className="ds-order-id">#{o._id.slice(-7).toUpperCase()}</span>
                      <span className="ds-badge" style={{ background: meta.bg, color: meta.color }}>{meta.label}</span>
                    </div>
                    <div className="ds-order-card-mid">
                      <span>{o.shippingAddress?.fullName || '—'}</span>
                      <span className="ds-amount">{fmtMoney(o.totalPrice)}</span>
                    </div>
                    <div className="ds-order-card-bot">
                      <span>{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</span>
                      <span className="ds-date">{new Date(o.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
