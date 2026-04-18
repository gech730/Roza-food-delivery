import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Package, 
  DollarSign, 
  Users, 
  UtensilsCrossed,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle
} from 'lucide-react';
import './Dashboard.css';

const STATUS_META = {
  pending:          { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Pending', icon: Clock },
  paid:             { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Confirmed', icon: CheckCircle2 },
  preparing:        { color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)', label: 'Preparing', icon: UtensilsCrossed },
  out_for_delivery: { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', label: 'On the Way', icon: Truck },
  delivered:        { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Delivered', icon: CheckCircle2 },
  cancelled:        { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Cancelled', icon: XCircle },
};

const fmt = (n) => new Intl.NumberFormat().format(n ?? 0);
const fmtMoney = (n) => `$${(n ?? 0).toFixed(2)}`;

// Generate mock chart data based on real stats
const generateChartData = (monthOrders, monthRevenue) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    name: day,
    orders: Math.floor((monthOrders / 7) * (0.7 + Math.random() * 0.6)),
    revenue: Math.floor((monthRevenue / 7) * (0.7 + Math.random() * 0.6)),
  }));
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, sub, subPositive, accent }) => (
  <div className="ds-stat">
    <div className="ds-stat-header">
      <div className="ds-stat-icon" style={{ background: `${accent}15`, color: accent }}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      {subPositive !== undefined && (
        <div className={`ds-stat-badge ${subPositive ? 'positive' : ''}`}>
          {subPositive && <ArrowUpRight size={14} />}
          {sub}
        </div>
      )}
    </div>
    <div className="ds-stat-content">
      <span className="ds-stat-value">{value}</span>
      <span className="ds-stat-label">{label}</span>
    </div>
  </div>
);

// Chart tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="ds-chart-tooltip">
        <p className="ds-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="ds-tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {entry.name === 'revenue' ? `$${entry.value}` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Dashboard Component
const Dashboard = ({ url, token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/api/admin/dashboard`, { headers: { token } })
      .then(r => { if (r.data.success) setStats(r.data.data); else toast.error(r.data.message); })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, [url, token]);

  if (loading) return (
    <div className="ds-loading">
      <div className="ds-loading-inner">
        <div className="a-spinner" />
        <p>Loading dashboard...</p>
      </div>
    </div>
  );

  if (!stats) return (
    <div className="ds-empty">
      <Package size={56} strokeWidth={1.5} />
      <h3>No data available</h3>
      <p>Start by adding products and receiving orders</p>
    </div>
  );

  const totalOrders = stats.totalOrders || 0;
  const chartData = generateChartData(stats.monthOrders || 0, stats.monthRevenue || 0);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="ds-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here&apos;s your restaurant overview.</p>
        </div>
        <div className="ds-header-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="ds-stats">
        <StatCard
          icon={Package}
          label="Total Orders"
          value={fmt(stats.totalOrders)}
          sub={`+${stats.monthOrders} this month`}
          subPositive={true}
          accent="#F97316"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={fmtMoney(stats.totalRevenue)}
          sub={`+${fmtMoney(stats.monthRevenue)} this month`}
          subPositive={true}
          accent="#10B981"
        />
        <StatCard
          icon={Users}
          label="Registered Users"
          value={fmt(stats.totalUsers)}
          accent="#3B82F6"
        />
        <StatCard
          icon={UtensilsCrossed}
          label="Menu Items"
          value={fmt(stats.totalFoods)}
          accent="#8B5CF6"
        />
      </div>

      {/* Charts Section */}
      <div className="ds-charts">
        <div className="a-card ds-chart-card">
          <div className="ds-card-header">
            <div>
              <h3>Orders Overview</h3>
              <p>Weekly order activity</p>
            </div>
            <div className="ds-card-icon">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="ds-chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted)', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#orderGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="a-card ds-chart-card">
          <div className="ds-card-header">
            <div>
              <h3>Revenue Analytics</h3>
              <p>Weekly revenue breakdown</p>
            </div>
            <div className="ds-card-icon success">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="ds-chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted)', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="ds-mid">
        {/* Order Status Breakdown */}
        <div className="a-card ds-status-card">
          <div className="ds-card-header">
            <h3>Order Status</h3>
            <button className="ds-link" onClick={() => navigate('/orders')}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          {stats.ordersByStatus.length === 0 ? (
            <p className="ds-empty-text">No orders yet.</p>
          ) : (
            <div className="ds-status-list">
              {stats.ordersByStatus
                .sort((a, b) => b.count - a.count)
                .map(s => {
                  const meta = STATUS_META[s._id] || { color: '#71717A', bg: 'rgba(113, 113, 122, 0.1)', label: s._id, icon: Package };
                  const Icon = meta.icon;
                  const pct = totalOrders > 0 ? Math.round((s.count / totalOrders) * 100) : 0;
                  return (
                    <div key={s._id} className="ds-status-item">
                      <div className="ds-status-info">
                        <div className="ds-status-icon" style={{ background: meta.bg, color: meta.color }}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <span className="ds-status-label">{meta.label}</span>
                          <span className="ds-status-count">{s.count} orders</span>
                        </div>
                      </div>
                      <div className="ds-status-progress">
                        <div className="ds-progress-bar">
                          <div 
                            className="ds-progress-fill" 
                            style={{ width: `${pct}%`, background: meta.color }}
                          />
                        </div>
                        <span className="ds-status-pct">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Revenue Summary */}
        <div className="a-card ds-revenue-card">
          <div className="ds-card-header">
            <h3>Revenue Summary</h3>
          </div>
          <div className="ds-revenue-grid">
            <div className="ds-rev-item">
              <span className="ds-rev-label">Total Revenue</span>
              <span className="ds-rev-value success">{fmtMoney(stats.totalRevenue)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">This Month</span>
              <span className="ds-rev-value info">{fmtMoney(stats.monthRevenue)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Total Orders</span>
              <span className="ds-rev-value">{fmt(stats.totalOrders)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Orders This Month</span>
              <span className="ds-rev-value">{fmt(stats.monthOrders)}</span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Avg. Order Value</span>
              <span className="ds-rev-value warning">
                {totalOrders > 0 ? fmtMoney(stats.totalRevenue / totalOrders) : '$0.00'}
              </span>
            </div>
            <div className="ds-rev-item">
              <span className="ds-rev-label">Delivery Rate</span>
              <span className="ds-rev-value success">
                {totalOrders > 0
                  ? `${Math.round(((stats.ordersByStatus.find(s => s._id === 'delivered')?.count || 0) / totalOrders) * 100)}%`
                  : '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="a-card ds-recent">
        <div className="ds-card-header">
          <h3>Recent Orders</h3>
          <button className="ds-link" onClick={() => navigate('/orders')}>
            View all <ArrowRight size={14} />
          </button>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="ds-empty-text">No orders yet.</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="ds-table-wrap">
              <table className="a-table">
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
                    const meta = STATUS_META[o.status] || { color: '#71717A', bg: 'rgba(113, 113, 122, 0.1)', label: o.status };
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
                        <td>
                          <span className="ds-items">{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</span>
                        </td>
                        <td>
                          <span className="ds-amount">{fmtMoney(o.totalPrice)}</span>
                        </td>
                        <td>
                          <span className="ds-badge" style={{ background: meta.bg, color: meta.color }}>
                            {meta.label}
                          </span>
                        </td>
                        <td className="ds-date">
                          {new Date(o.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="ds-order-cards">
              {stats.recentOrders.map(o => {
                const meta = STATUS_META[o.status] || { color: '#71717A', bg: 'rgba(113, 113, 122, 0.1)', label: o.status };
                return (
                  <div key={o._id} className="ds-order-card">
                    <div className="ds-order-card-top">
                      <span className="ds-order-id">#{o._id.slice(-7).toUpperCase()}</span>
                      <span className="ds-badge" style={{ background: meta.bg, color: meta.color }}>
                        {meta.label}
                      </span>
                    </div>
                    <div className="ds-order-card-mid">
                      <span>{o.shippingAddress?.fullName || '—'}</span>
                      <span className="ds-amount">{fmtMoney(o.totalPrice)}</span>
                    </div>
                    <div className="ds-order-card-bot">
                      <span>{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</span>
                      <span>{new Date(o.createdAt).toLocaleDateString()}</span>
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
