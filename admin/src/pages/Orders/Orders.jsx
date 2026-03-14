import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

/**
 * Orders Management Component
 * Displays and manages all customer orders
 */
const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);

  /**
   * Fetch All Orders
   * Retrieves all orders from the database
   */
  const fetchAllOrders = async () => {
    try {
      const res = await axios.post(`${url}/api/order/list`, {}, {
        headers: { token }
      });
      
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error("Failed to fetch orders");
    }
  };

  /**
   * Handle Status Change
   * Updates order status in the database
   */
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    try {
      const res = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchAllOrders(); // Refresh orders
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status");
    }
  };

  // Fetch orders on component mount
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
              {/* Parcel Icon */}
              <img src={assets.parcel_icon} alt="Parcel" />
              
              {/* Order Details */}
              <div className="order-details">
                {/* Food Items */}
                <p className='order-item-food'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                
                {/* Customer Name */}
                <p className='order-item-name'>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                
                {/* Delivery Address */}
                <div className="order-item-address">
                  <p>{order.address?.street}</p>
                  <p>
                    {order.address?.city}, {order.address?.state}, 
                    {order.address?.country}, {order.address?.zipcode}
                  </p>
                </div>
                
                {/* Phone Number */}
                <p className='order-item-phone'>{order.address?.phone}</p>
                
                {/* Order Date */}
                <p className='order-date'>
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
              
              {/* Order Summary */}
              <div className="order-summary">
                <p>Items: {order.items.length}</p>
                <p className="order-amount">£{order.amount}</p>
                <p className={`payment-status ${order.payment ? 'paid' : 'pending'}`}>
                  {order.payment ? 'Paid' : 'Pending'}
                </p>
              </div>
              
              {/* Status Selector */}
              <select 
                onChange={(event) => statusHandler(event, order._id)} 
                value={order.status}
                className={`status-select status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
