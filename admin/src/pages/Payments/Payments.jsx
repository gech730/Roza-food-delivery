import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Search,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  RefreshCw,
  User,
} from 'lucide-react';
import './Payments.css';

const Payments = ({ url, token }) => {
  const [payments, setPayments]   = useState([]);
  const [stats, setStats]         = useState({ totalRevenue: 0, completed: 0, pending: 0, failed: 0 });
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/order/payments`, { headers: { token } });
      if (res.data.success) {
        const data = res.data.data || [];
        setPayments(data);
        setStats({
          totalRevenue: data
            .filter(p => p.status === 'completed')
            .reduce((s, p) => s + (p.amount || 0), 0),
          completed: data.filter(p => p.status === 'completed').length,
          pending:   data.filter(p => p.status === 'pending').length,
          failed:    data.filter(p => p.status === 'failed').length,
        });
      } else {
        toast.error(res.data.message || 'Failed to load payments');
      }
    } catch (err) {
      console.error('Payments fetch error:', err);
      toast.error('Failed to load payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const filtered = payments.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.tx_ref?.toLowerCase().includes(q) ||
        p.userName?.toLowerCase().includes(q) ||
        p.userEmail?.toLowerCase().includes(q) ||
        p.orderId?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statusIcon = (s) => {
    if (s === 'completed') return <CheckCircle size={13} />;
    if (s === 'failed')    return <XCircle size={13} />;
    return <Clock size={13} />;
  };

  const statusStyle = (s) => {
    if (s === 'completed') return { background: 'var(--success-bg)', color: 'var(--success)' };
    if (s === 'failed')    return { background: 'var(--danger-bg)',  color: 'var(--danger)'  };
    return { background: 'var(--warning-bg)', color: 'var(--warning)' };
  };

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <div className="payments-page">
      {/* Header */}
      <div className="a-page-header">
        <div>
          <h1>Payments</h1>
          <p>{payments.length} total transactions</p>
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
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="pay-stat-label">Total Revenue</p>
            <p className="pay-stat-value">{stats.totalRevenue.toLocaleString()} ETB</p>
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
        <div className="a-card pay-stat">
          <div className="pay-stat-icon" style={{ color: 'var(--danger)' }}>
            <XCircle size={28} />
          </div>
          <div>
            <p className="pay-stat-label">Failed</p>
            <p className="pay-stat-value">{stats.failed}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="a-card pay-toolbar">
        <div className="a-search">
          <Search size={16} className="a-search-icon" />
          <input
            placeholder="Search by name, email or transaction ID..."
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

      {/* Table */}
      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap"><div className="a-spinner" /></div>
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
                  <th>Customer</th>
                  <th>Transaction ID</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div className="pay-customer">
                        <div className="pay-customer-avatar">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="pay-customer-name">{p.userName}</p>
                          <p className="pay-customer-email">{p.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="pay-order-id" title={p.tx_ref}>
                        {p.tx_ref ? p.tx_ref.slice(-10) : p.orderId.slice(-8)}
                      </span>
                    </td>
                    <td>
                      <span className="pay-items-count">{p.itemsCount} item{p.itemsCount !== 1 ? 's' : ''}</span>
                    </td>
                    <td>
                      <span className="pay-amount">{(p.amount || 0).toLocaleString()} ETB</span>
                    </td>
                    <td>
                      <span className="pay-method">{p.method}</span>
                    </td>
                    <td>
                      <span className="a-badge" style={statusStyle(p.status)}>
                        {statusIcon(p.status)}
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="pay-dates">
                        <span className="pay-date">{fmtDate(p.createdAt)}</span>
                        {p.paidAt && (
                          <span className="pay-paid-at">Paid: {fmtDate(p.paidAt)}</span>
                        )}
                      </div>
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
