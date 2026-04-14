import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Payments.css';

const Payments = ({ url, token }) => {
  const [orders, setOrders]   = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [filter, setFilter]   = useState('');
  const [loading, setLoading] = useState(true);
  const LIMIT = 20;

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      const res = await axios.post(`${url}/api/order/list?${params}`, {}, { headers: { token } });
      if (res.data.success) {
        let data = res.data.data;
        if (filter === 'paid')    data = data.filter(o => o.isPaid);
        if (filter === 'pending') data = data.filter(o => !o.isPaid);
        setOrders(data);
        setTotal(res.data.total);
      }
    } catch { toast.error('Failed to fetch payments'); }
    finally { setLoading(false); }
  }, [page, filter, url, token]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const totalRevenue = orders.filter(o => o.isPaid).reduce((s, o) => s + o.totalPrice, 0);
  const pages = Math.ceil(total / LIMIT);

  return (
    <div style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Payments</h1><p>All Chapa transactions</p></div>
      </div>

      {/* Summary cards */}
      <div className="pay-summary">
        <div className="a-card pay-stat">
          <span className="pay-stat-icon">💰</span>
          <div>
            <p className="pay-stat-label">Revenue (this page)</p>
            <p className="pay-stat-value">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="a-card pay-stat">
          <span className="pay-stat-icon">✅</span>
          <div>
            <p className="pay-stat-label">Paid</p>
            <p className="pay-stat-value">{orders.filter(o => o.isPaid).length}</p>
          </div>
        </div>
        <div className="a-card pay-stat">
          <span className="pay-stat-icon">⏳</span>
          <div>
            <p className="pay-stat-label">Pending</p>
            <p className="pay-stat-value">{orders.filter(o => !o.isPaid).length}</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="a-card pay-toolbar">
        {[['', 'All'], ['paid', 'Paid'], ['pending', 'Pending']].map(([val, label]) => (
          <button key={val} className={`a-btn a-btn-sm ${filter === val ? 'a-btn-primary' : 'a-btn-ghost'}`} onClick={() => { setFilter(val); setPage(1); }}>
            {label}
          </button>
        ))}
      </div>

      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap"><div className="a-spinner" /></div>
        ) : orders.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)' }}>💳 No transactions found.</div>
        ) : (
          <table className="a-table">
            <thead>
              <tr><th>Tx Ref</th><th>Customer</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)' }}>{o.tx_ref || '—'}</td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{o.shippingAddress?.fullName || '—'}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{o.paymentResult?.email}</div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--brand)' }}>${o.totalPrice}</td>
                  <td>
                    <span className="a-badge" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                      {o.paymentMethod || 'Chapa'}
                    </span>
                  </td>
                  <td>
                    <span className="a-badge" style={{ background: o.isPaid ? '#dcfce7' : '#fef9c3', color: o.isPaid ? '#16a34a' : '#ca8a04' }}>
                      {o.isPaid ? '✓ Paid' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {o.paidAt ? new Date(o.paidAt).toLocaleString() : new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 && (
        <div className="a-pagination">
          <button className="a-btn a-btn-ghost a-btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span>Page {page} of {pages}</span>
          <button className="a-btn a-btn-ghost a-btn-sm" disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
};

export default Payments;
