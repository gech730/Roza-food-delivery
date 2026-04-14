import axios from "axios";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Step 1: Initialize payment — save a pending order first, then redirect to Chapa
const paymentInitialize = async (req, res) => {
  try {
    const { amount, email, first_name, last_name, phone_number, address, items, itemsPrice, deliveryFee } = req.body;
    const userId = req.userId;
    const tx_ref = "tx-" + Date.now();

    // Save pending order to DB before redirecting
    await orderModel.create({
      userId,
      items,
      itemsPrice,
      deliveryFee,
      totalPrice: amount,
      shippingAddress: address,
      tx_ref,
      paymentResult: { tx_ref, email },
      status: "pending",
      isPaid: false,
    });

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount,
        currency: "ETB",
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
        callback_url: `${process.env.BASE_URL}/api/order/callbackVerify`,
        return_url: `${process.env.FRONTEND_URL}/verify?tx_ref=${tx_ref}`,
      },
      {
        headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
      }
    );

    res.json({ checkout_url: response.data.data.checkout_url, tx_ref });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "Payment init failed" });
  }
};

// Step 2: Chapa webhook callback (server-to-server)
const paymentCallback = async (req, res) => {
  try {
    const { tx_ref } = req.body;

    const verify = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      { headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` } }
    );

    if (verify.data.status === "success") {
      await _markOrderPaid(tx_ref, verify.data.data);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

// Step 3: Frontend verify after redirect
const verifyPayment = async (req, res) => {
  try {
    const { tx_ref } = req.params;

    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      { headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` } }
    );

    if (response.data.status === "success") {
      await _markOrderPaid(tx_ref, response.data.data);
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Shared helper: mark order paid + clear user cart
const _markOrderPaid = async (tx_ref, chapaData) => {
  const order = await orderModel.findOne({ tx_ref });
  if (!order || order.isPaid) return; // already processed

  await orderModel.findByIdAndUpdate(order._id, {
    isPaid: true,
    paidAt: new Date(),
    status: "paid",
    chapa_verify_data: chapaData,
    "paymentResult.status": "success",
    "paymentResult.chapa_ref": chapaData?.chapa_ref || "",
  });

  // Clear cart from user document
  await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
};

const userOrders = async (req, res) => {
  const { userId } = req;
  try {
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("User orders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("List orders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, message: "Order ID and status required" });
    }

    const validStatuses = ["pending", "paid", "preparing", "out_for_delivery", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) return res.json({ success: false, message: "Order not found" });

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: `Order status updated to ${status}` });
  } catch (error) {
    console.log("Update status error:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);
    if (!order) return res.json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    console.log("Get order error:", error);
    res.json({ success: false, message: "Error fetching order" });
  }
};

export {
  paymentInitialize,
  verifyPayment,
  paymentCallback,
  userOrders,
  listOrders,
  updateStatus,
  getOrderById,
};
