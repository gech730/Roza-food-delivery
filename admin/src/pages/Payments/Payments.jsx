import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Search, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  DollarSign,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import './Payments.css';

const Payments = ({ url, token }) => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/payment/list`, { headers: { token } });
      if (res.data.success) {
        setPayments(res.data.data || []);
        // Calculate stats
        const data = res.data.data || [];
        const completed = data.filter(p => p.status === 'completed');
        setStats({
          total: data.reduce((s, p) => s + (p.amount || 0), 0),
          completed: completed.length,
          pending: data.filter(p => p.status === 'pending').length,
          failed: data.filter(p => p.status === 'failed').length
        });
      }
    } catch {
      // Silent fail - API might not exist
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filtered = payments.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.orderId?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'failed': return <XCircle size={14} />;
      default: return <CreditCard size={14} />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return { background: 'var(--success-bg)', color: 'var(--success)' };
      case 'pending': return { background: 'var(--warning-bg)', color: 'var(--warning)' };
      case 'failed': return { background: 'var(--danger-bg)', color: 'var(--danger)' };
      default: return {};
    }
  };

  return (
    <div className="payments-page">
      {/* Header */}
      <div className="a-page-header">
        <div>
          <h1>Payments</h1>
          <p>Manage payment transactions</p>
        </div>
        <button className="a-btn a-btn-ghost" onClick={fetchPayments}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="pay-summary">
        <div className="a-card pay-stat">
          <div className="pay-stat-icon" style={{ color: 'var(--brand)' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <p className="pay-stat-label">Total Revenue</p>
            <p className="pay-stat-value">${stats.total.toLocaleString()}</p>
          </div>
        </div>
        <div className="a-card pay-stat">
          <div className="pay-stat-icon" style={{ color: 'var(--success)' }}>
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="pay-stat-label">Completed</p>
            <p className="pay-stat-value">{stats.completed}</p>
          </div>
        </div>
        <div className="a-card pay-stat">
          <div className="pay-stat-icon" style={{ color: 'var(--warning)' }}>
            <Clock size={28} />
          </div>
          <div>
            <p className="pay-stat-label">Pending</p>
            <p className="pay-stat-value">{stats.pending}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="a-card pay-toolbar">
        <div className="a-search">
          <Search size={16} className="a-search-icon" />
          <input
            placeholder="Search by order ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="pay-filters">
          {['all', 'completed', 'pending', 'failed'].map(f => (
            <button
              key={f}
              className={`a-btn a-btn-sm ${filter === f ? 'a-btn-primary' : 'a-btn-ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap">
            <div className="a-spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="a-empty">
            <CreditCard size={48} strokeWidth={1.5} className="a-empty-icon" />
            <p>No payments found</p>
          </div>
        ) : (
          <div className="pay-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(payment => (
                  <tr key={payment._id}>
                    <td>
                      <span className="pay-order-id">{payment.orderId?.slice(-8) || 'N/A'}</span>
                    </td>
                    <td>
                      <span className="pay-method">{payment.method || 'Card'}</span>
                    </td>
                    <td>
                      <span className="pay-amount">${payment.amount?.toFixed(2) || '0.00'}</span>
                    </td>
                    <td>
                      <span className="a-badge" style={getStatusStyle(payment.status)}>
                        {getStatusIcon(payment.status)}
                        {payment.status || 'unknown'}
                      </span>
                    </td>
                    <td>
                      <span className="pay-date">
                        {payment.createdAt
                          ? new Date(payment.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
