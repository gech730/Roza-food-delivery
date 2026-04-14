import {Router} from "express";
import { 
  paymentInitialize, 
  paymentCallback, 
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


orderRouter.post("/initialize", authMiddleware, paymentInitialize);

orderRouter.post("/callbackVerify", authMiddleware, paymentCallback);
orderRouter.get("/verify/:tx_ref", verifyPayment);

orderRouter.post("/userorders", authMiddleware, userOrders);


orderRouter.post("/list", adminAuthMiddleware, listOrders);


orderRouter.post("/status", adminAuthMiddleware, updateStatus);


orderRouter.post("/getbyid", adminAuthMiddleware, getOrderById);

export default orderRouter;
