import {Router} from "express";
import { 
  placeOrder, 
  verifyPayment, 
  userOrders, 
  listOrders, 
  updateStatus,
  getOrderById 
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const orderRouter = Router();

/**
 * Order Routes
 * 
 * User routes (require authentication):
 * - POST /api/order/place - Place new order
 * - POST /api/order/verify - Verify payment
 * - POST /api/order/userorders - Get user's orders
 * 
 * Admin routes (require admin authentication):
 * - POST /api/order/list - Get all orders (admin)
 * - POST /api/order/status - Update order status (admin)
 * - POST /api/order/getbyid - Get single order (admin)
 */

// POST /api/order/place - Place new order (user auth required)
orderRouter.post("/place", authMiddleware, placeOrder);

// POST /api/order/verify - Verify payment (user auth required)
orderRouter.post("/verify", authMiddleware, verifyPayment);

// POST /api/order/userorders - Get logged-in user's orders
orderRouter.post("/userorders", authMiddleware, userOrders);

// POST /api/order/list - Get all orders (admin only)
orderRouter.post("/list", adminAuthMiddleware, listOrders);

// POST /api/order/status - Update order status (admin only)
orderRouter.post("/status", adminAuthMiddleware, updateStatus);

// POST /api/order/getbyid - Get single order details (admin only)
orderRouter.post("/getbyid", adminAuthMiddleware, getOrderById);

export default orderRouter;
