import React, { useContext, useEffect, useState } from 'react';
import './UserOrder.css';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const STATUS_STEPS = ['pending', 'paid', 'preparing', 'out_for_delivery', 'delivered'];

const STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLORS = {
  pending: '#f59e0b',
  paid: '#3b82f6',
  preparing: '#f97316',
  out_for_delivery: '#8b5cf6',
  delivered: '#22c55e',
  cancelled: '#ef4444',
};

const STEP_ICONS = ['✓', '🍳', '🛵', '📦'];
const STEP_KEYS = ['paid', 'preparing', 'out_for_delivery', 'delivered'];
const STEP_LABELS = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const getStepIndex = (status) => STEP_KEYS.indexOf(status);

const EstimatedTime = ({ status }) => {
  const times = {
    paid: '35–45 min',
    preparing: '25–35 min',
    out_for_delivery: '10–15 min',
    delivered: 'Delivered',
    cancelled: '—',
    pending: 'Awaiting confirmation',
  };
  return <span>{times[status] || '—'}</span>;
};

const UserOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
      if (res.data.success) setOrders(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  if (loading) return <div className="uo-loading"><div className="uo-spinner" /></div>;

  return (
    <div className="uo-page">
      <div className="uo-header">
        <h1>My Orders</h1>
        <p>{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
      </div>

      {orders.length === 0 ? (
        <div className="uo-empty">
          <div className="uo-empty-icon">🛵</div>
          <h3>No orders yet</h3>
          <p>Your orders will appear here once you place one.</p>
        </div>
      ) : (
        <div className="uo-list">
          {orders.map((order) => {
            const isExpanded = expandedId === order._id;
            const stepIdx = getStepIndex(order.status);
            const isCancelled = order.status === 'cancelled';

            return (
              <div key={order._id} className="uo-card">

                {/* Card Header */}
                <div className="uo-card-header">
                  <div className="uo-card-meta">
                    <span className="uo-order-id">#{order._id.slice(-8).toUpperCase()}</span>
                    <span className="uo-order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="uo-card-right">
                    <span
                      className="uo-status-badge"
                      style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status], border: `1px solid ${STATUS_COLORS[order.status]}40` }}
                    >
                      <span className="uo-status-dot" style={{ background: STATUS_COLORS[order.status] }} />
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                </div>

                {/* Progress Tracker */}
                {!isCancelled && (
                  <div className="uo-tracker">
                    {STEP_KEYS.map((step, i) => {
                      const done = stepIdx >= i;
                      const active = stepIdx === i;
                      return (
                        <React.Fragment key={step}>
                          <div className={`uo-step ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
                            <div className="uo-step-circle">
                              {done ? STEP_ICONS[i] : <span>{i + 1}</span>}
                            </div>
                            <span className="uo-step-label">{STEP_LABELS[i]}</span>
                          </div>
                          {i < STEP_KEYS.length - 1 && (
                            <div className={`uo-step-line ${stepIdx > i ? 'done' : ''}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}

                {isCancelled && (
                  <div className="uo-cancelled-banner">
                    ✕ This order has been cancelled
                  </div>
                )}

                {/* Summary Row */}
                <div className="uo-summary-row">
                  <div className="uo-summary-item">
                    <span className="uo-label">Items</span>
                    <span className="uo-value">{order.items.length}</span>
                  </div>
                  <div className="uo-summary-item">
                    <span className="uo-label">Total</span>
                    <span className="uo-value uo-price">${order.totalPrice}</span>
                  </div>
                  <div className="uo-summary-item">
                    <span className="uo-label">Payment</span>
                    <span className={`uo-value uo-pay-status ${order.isPaid ? 'paid' : ''}`}>
                      {order.isPaid ? '✓ Paid via Chapa' : 'Pending'}
                    </span>
                  </div>
                  <div className="uo-summary-item">
                    <span className="uo-label">Est. Delivery</span>
                    <span className="uo-value"><EstimatedTime status={order.status} /></span>
                  </div>
                </div>

                {/* Expandable Details */}
                {isExpanded && (
                  <div className="uo-details">
                    {/* Items */}
                    <div className="uo-section">
                      <h4>Order Items</h4>
                      <div className="uo-items-list">
                        {order.items.map((item, i) => (
                          <div key={i} className="uo-item">
                            <img
                              src={item.image ? `${url}/images/${item.image}` : '/logo.png'}
                              alt={item.name}
                              onError={(e) => { e.target.src = '/logo.png'; }}
                            />
                            <div className="uo-item-info">
                              <span className="uo-item-name">{item.name}</span>
                              <span className="uo-item-qty">x{item.quantity}</span>
                            </div>
                            <span className="uo-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="uo-price-breakdown">
                        <div className="uo-price-row">
                          <span>Subtotal</span>
                          <span>${order.itemsPrice}</span>
                        </div>
                        <div className="uo-price-row">
                          <span>Delivery fee</span>
                          <span>${order.deliveryFee}</span>
                        </div>
                        <div className="uo-price-row total">
                          <span>Total</span>
                          <span>${order.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    {order.shippingAddress && (
                      <div className="uo-section">
                        <h4>Delivery Address</h4>
                        <div className="uo-address">
                          <div className="uo-address-icon">📍</div>
                          <div>
                            <p className="uo-address-name">{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}{order.shippingAddress.region ? `, ${order.shippingAddress.region}` : ''}</p>
                            <p className="uo-address-phone">📞 {order.shippingAddress.phone}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="uo-actions">
                  <button className="uo-btn-track" onClick={() => { toggleExpand(order._id); fetchOrders(); }}>
                    {isExpanded ? 'Hide Details' : 'Track Order'}
                  </button>
                  {(order.status === 'pending' || order.status === 'paid') && (
                    <button className="uo-btn-cancel" disabled>
                      Cancel Order
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrder;
