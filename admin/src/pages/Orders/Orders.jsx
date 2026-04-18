import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Search, 
  Package, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  UtensilsCrossed,
  MapPin,
  Phone
} from 'lucide-react';
import './Orders.css';

const STATUSES = ['pending', 'paid', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

const STATUS_META = {
  pending:          { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Pending', icon: Clock },
  paid:             { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Confirmed', icon: CheckCircle2 },
  preparing:        { color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)', label: 'Preparing', icon: UtensilsCrossed },
  out_for_delivery: { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', label: 'On the Way', icon: Truck },
  delivered:        { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Delivered', icon: CheckCircle2 },
  cancelled:        { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Cancelled', icon: XCircle },
};

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
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
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [page, filter, search, url, token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, { orderId, status }, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const pages = Math.ceil(total / LIMIT);

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="a-page-header">
        <div>
          <h1>Orders</h1>
          <p>{total} total orders</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="orders-toolbar a-card">
        <div className="a-search">
          <Search size={16} className="a-search-icon" />
          <input
            placeholder="Search by name, phone, ID..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="orders-filters">
          <button
            className={`a-btn a-btn-sm ${filter === '' ? 'a-btn-primary' : 'a-btn-ghost'}`}
            onClick={() => { setFilter(''); setPage(1); }}
          >
            All
          </button>
          {STATUSES.map(s => {
            const meta = STATUS_META[s];
            return (
              <button
                key={s}
                className={`a-btn a-btn-sm ${filter === s ? 'a-btn-primary' : 'a-btn-ghost'}`}
                onClick={() => { setFilter(s); setPage(1); }}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="a-card orders-table-card">
        {loading ? (
          <div className="a-spinner-wrap">
            <div className="a-spinner" />
          </div>
        ) : orders.length === 0 ? (
          <div className="a-empty">
            <Package size={48} strokeWidth={1.5} className="a-empty-icon" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const meta = STATUS_META[order.status] || STATUS_META.pending;
                  const Icon = meta.icon;
                  const isExpanded = expanded === order._id;

                  return (
                    <React.Fragment key={order._id}>
                      <tr className={isExpanded ? 'order-row-expanded' : ''}>
                        <td>
                          <button
                            className="order-id-btn"
                            onClick={() => setExpanded(isExpanded ? null : order._id)}
                          >
                            <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </td>
                        <td>
                          <div className="order-customer">
                            <div className="order-avatar">
                              {(order.shippingAddress?.fullName?.[0] || '?').toUpperCase()}
                            </div>
                            <div>
                              <span className="order-customer-name">{order.shippingAddress?.fullName || '—'}</span>
                              <span className="order-customer-phone">{order.shippingAddress?.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="order-items">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span>
                        </td>
                        <td>
                          <span className="order-amount">${order.totalPrice}</span>
                        </td>
                        <td>
                          <span
                            className="a-badge"
                            style={{
                              background: order.isPaid ? 'var(--success-bg)' : 'var(--warning-bg)',
                              color: order.isPaid ? 'var(--success)' : 'var(--warning)'
                            }}
                          >
                            {order.isPaid ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td>
                          <span
                            className="a-badge order-status-badge"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            <Icon size={12} />
                            {meta.label}
                          </span>
                        </td>
                        <td>
                          <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td>
                          <select
                            className="order-status-select"
                            value={order.status}
                            onChange={e => updateStatus(order._id, e.target.value)}
                          >
                            {STATUSES.map(s => (
                              <option key={s} value={s}>
                                {STATUS_META[s].label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="order-detail-row">
                          <td colSpan={8}>
                            <div className="order-detail">
                              <div className="order-detail-section">
                                <h4>
                                  <Package size={16} />
                                  Order Items
                                </h4>
                                <div className="order-detail-items">
                                  {order.items?.map((item, i) => (
                                    <div key={i} className="order-detail-item">
                                      <img
                                        src={`${url}/images/${item.image}`}
                                        alt={item.name}
                                        onError={e => { e.target.style.display = 'none'; }}
                                      />
                                      <div className="order-item-info">
                                        <span className="order-item-name">{item.name}</span>
                                        <span className="order-item-qty">Qty: {item.quantity}</span>
                                      </div>
                                      <span className="order-item-price">${item.price * item.quantity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="order-detail-section">
                                <h4>
                                  <MapPin size={16} />
                                  Delivery Address
                                </h4>
                                <div className="order-detail-address">
                                  <p>{order.shippingAddress?.address}</p>
                                  <p>{order.shippingAddress?.city}{order.shippingAddress?.region ? `, ${order.shippingAddress.region}` : ''}</p>
                                  <p className="order-address-phone">
                                    <Phone size={14} />
                                    {order.shippingAddress?.phone}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="a-pagination">
          <button
            className="a-btn a-btn-ghost a-btn-sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span>Page {page} of {pages}</span>
          <button
            className="a-btn a-btn-ghost a-btn-sm"
            disabled={page === pages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
