import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';

const STATUSES = ['pending','paid','preparing','out_for_delivery','delivered','cancelled'];
const STATUS_COLOR = {
  pending:'#f59e0b', paid:'#3b82f6', preparing:'#f97316',
  out_for_delivery:'#8b5cf6', delivered:'#22c55e', cancelled:'#ef4444',
};

const Orders = ({ url, token }) => {
  const [orders, setOrders]   = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [filter, setFilter]   = useState('');
  const [search, setSearch]   = useState('');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const LIMIT = 15;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (filter) params.append('status', filter);
      const res = await axios.post(`${url}/api/order/list?${params}`, {}, { headers: { token } });
      if (res.data.success) {
        let data = res.data.data;
        if (search) {
          const q = search.toLowerCase();
          data = data.filter(o =>
            o._id.toLowerCase().includes(q) ||
            o.shippingAddress?.fullName?.toLowerCase().includes(q) ||
            o.shippingAddress?.phone?.includes(q)
          );
        }
        setOrders(data);
        setTotal(res.data.total || data.length);
      }
    } catch { toast.error('Failed to fetch orders'); }
    finally { setLoading(false); }
  }, [page, filter, search, url, token]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, { orderId, status }, { headers: { token } });
      if (res.data.success) { toast.success(res.data.message); fetchOrders(); }
      else toast.error(res.data.message);
    } catch { toast.error('Failed to update status'); }
  };

  const pages = Math.ceil(total / LIMIT);

  return (
    <div style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Orders</h1><p>{total} total orders</p></div>
      </div>

      {/* Filters */}
      <div className="orders-toolbar a-card">
        <div className="a-search">
          <span className="a-search-icon">🔍</span>
          <input placeholder="Search by name, phone, ID…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div className="orders-filters">
          <button className={`a-btn a-btn-sm ${filter === '' ? 'a-btn-primary' : 'a-btn-ghost'}`} onClick={() => { setFilter(''); setPage(1); }}>All</button>
          {STATUSES.map(s => (
            <button key={s} className={`a-btn a-btn-sm ${filter === s ? 'a-btn-primary' : 'a-btn-ghost'}`} onClick={() => { setFilter(s); setPage(1); }}>
              {s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="a-card orders-table-wrap">
        {loading ? (
          <div className="a-spinner-wrap"><div className="a-spinner" /></div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">📦 No orders found.</div>
        ) : (
          <table className="a-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Action</th></tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <React.Fragment key={order._id}>
                  <tr className={expanded === order._id ? 'order-row-expanded' : ''}>
                    <td>
                      <button className="order-id-btn" onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                        #{order._id.slice(-8).toUpperCase()}
                        <span style={{ marginLeft: 4 }}>{expanded === order._id ? '▲' : '▼'}</span>
                      </button>
                    </td>
                    <td>
                      <div className="order-customer">
                        <strong>{order.shippingAddress?.fullName || '—'}</strong>
                        <span>{order.shippingAddress?.phone}</span>
                      </div>
                    </td>
                    <td>{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</td>
                    <td style={{ fontWeight: 700, color: 'var(--brand)' }}>${order.totalPrice}</td>
                    <td>
                      <span className="a-badge" style={{ background: order.isPaid ? '#dcfce7' : '#fef9c3', color: order.isPaid ? '#16a34a' : '#ca8a04' }}>
                        {order.isPaid ? '✓ Paid' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <span className="a-badge" style={{ background: (STATUS_COLOR[order.status] || '#aaa') + '18', color: STATUS_COLOR[order.status] || '#aaa' }}>
                        {order.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        className="order-status-select"
                        value={order.status}
                        onChange={e => updateStatus(order._id, e.target.value)}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                      </select>
                    </td>
                  </tr>
                  {expanded === order._id && (
                    <tr className="order-detail-row">
                      <td colSpan={8}>
                        <div className="order-detail">
                          <div className="order-detail-items">
                            <h4>Items</h4>
                            {order.items?.map((item, i) => (
                              <div key={i} className="order-detail-item">
                                <img src={`${url}/images/${item.image}`} alt={item.name} onError={e => { e.target.style.display = 'none'; }} />
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                                <span style={{ color: 'var(--brand)', fontWeight: 700 }}>${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="order-detail-addr">
                            <h4>Delivery Address</h4>
                            <p>{order.shippingAddress?.address}</p>
                            <p>{order.shippingAddress?.city}{order.shippingAddress?.region ? `, ${order.shippingAddress.region}` : ''}</p>
                            <p>📞 {order.shippingAddress?.phone}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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

export default Orders;
