import axios from "axios";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



// Frontend URL for payment redirects
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

/**
 * Place New Order
 * Creates an order and initiates Stripe checkout session
 */
const placeOrder = async (req, res) => {
  try {
        const { amount, email, first_name, last_name } = req.body;
        const userId = req.userId;
         const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: amount,
        currency: "ETB",
        email: email,
        first_name: first_name,
        last_name: last_name,
        tx_ref: "tx-" + Date.now(), // unique reference
        callback_url: "http://localhost:8000/api/payment/verify",
        return_url: "http://localhost:5173/payment-success",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );
    
     res.json({
      checkout_url: response.data.data.checkout_url,
    });
      
  } catch (error) {
    console.log("Place order error:", error);
    res.json({ success: false, message: "Payment failed " });
  }
};

/**
 * Verify Payment
 * Confirms payment status from Stripe and updates order
 */
const verifyPayment = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true" || success === true) {
      // Mark order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      // Delete unpaid order
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log("Verify payment error:", error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

/**
 * Get User Orders
 * Retrieves all orders for the logged-in user
 */
const userOrders = async (req, res) => {
  const { userId } = req;
  try {
    const orders = await orderModel.find({ userId }).sort({ date: -1 }); // Most recent first
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("User orders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

/**
 * List All Orders
 * Retrieves all orders (for admin dashboard)
 */
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 }); // Most recent first
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("List orders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

/**
 * Update Order Status
 * Updates the status of an order (for admin)
 */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    // Validate input
    if (!orderId || !status) {
      return res.json({ success: false, message: "Order ID and status required" });
    }
    
    // Valid status values
    const validStatuses = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }
    
    // Find and update order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    
    // If cancelling, restore stock (future enhancement)
    if (status === "Cancelled" && order.status !== "Cancelled") {
      // Add stock restoration logic here if needed
    }
    
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: `Order status updated to ${status}` });
  } catch (error) {
    console.log("Update status error:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

/**
 * Get Single Order Details
 * Retrieves details of a specific order
 */
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    console.log("Get order error:", error);
    res.json({ success: false, message: "Error fetching order" });
  }
};

export { 
  placeOrder, 
  verifyPayment, 
  userOrders, 
  listOrders, 
  updateStatus,
  getOrderById 
};
