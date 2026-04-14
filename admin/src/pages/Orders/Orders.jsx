import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.post(`${url}/api/order/list`, {}, { headers: { token } });
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const res = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (res.data.success) {
     cess(res.data.message);
        await fetchAllOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Management</h3>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel" />

              <div className="order-details">
                <p className='order-item-food'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <p className='order-item-name'>
                  {order.shippingAddress?.fullName}
                </p>

              <div className="order-item-address">
                  <p>{order.shippingAddress?.address}</p>
                  <p>
                    {order.shippingAddress?.city}
                    {order.shippingAddress?.region ? `, ${order.shippingAddress.region}` : ""}
                    {order.shippingAddress?.postalCode ? ` ${order.shippingAddress.postalCode}` : ""}
                  </p>
                </div>

                <p className='order-item-phone'>{order.shippingAddress?.phone}</p>

                <p className='order-date'>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="order-summary">
                <p>Items: {order.items.length}</p>
                <p className="order-amount">${order.totalPrice}</p>
                {/* Customer Name */}
                <p className='order-item-name'>
                  {order.shippingAddress?.fullName}
                </p>
                
                {/* Delivery Address */}
                <div className="order-item-address">
                  <p>{order.shippingAddress?.address}</p>
                  <p>
                    {order.shippingAddress?.city}
                    {order.shippingAddress?.region ? `, ${order.shippingAddress.region}` : ""}
                    {order.shippingAddress?.postalCode ? ` ${order.shippingAddress.postalCode}` : ""}
                  </p>
                </div>
                
                {/* Phone Number */}
                <p className='order-item-phone'>{order.shippingAddress?.phone}</p>
                
                {/* Order Date */}
                <p className='order-date'>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
    </div>
              {/* Order Summary */}
              <div className="order-summary">
                <p>Items: {order.items.length}</p>
                <p className="order-amount">${order.totalPrice}</p>
                <p className={`payment-status ${order.isPaid ? 'paid' : 'pending'}`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </p>
              </div>
              
              {/* Status Selector */}
              <select 
                onChange={(event) => statusHandler(event, order._id)} 
                value={order.status}
                className={`status-select status-${order.status}`}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="preparing">Preparing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>