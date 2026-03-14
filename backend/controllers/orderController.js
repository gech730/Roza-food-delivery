import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Initialize Stripe with secret key from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

// Frontend URL for payment redirects
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

/**
 * Place New Order
 * Creates an order and initiates Stripe checkout session
 */
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    
    // Validate input
    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }
    
    // Create new order in database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Pending", // Initial order status
    });

    await newOrder.save();
    
    // Clear user's cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare Stripe line items for each food item
    const line_items = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          // Add description if available
          description: item.description || "",
        },
        unit_amount: Math.round(item.price * 100 * 0.83), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 0.83, // £2 delivery fee
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    
    res.json({ success: true, session_url: session.url });
    
  } catch (error) {
    console.log("Place order error:", error);
    res.json({ success: false, message: "Error placing order" });
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
