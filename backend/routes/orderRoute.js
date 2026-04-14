import { Router } from "express";
import {
  paymentInitialize,
  paymentCallback,
  verifyPayment,
  userOrders,
  listOrders,
  updateStatus,
  getOrderById,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";
import validate from "../middleware/validate.js";
import { orderInitValidator } from "../middleware/validators.js";

const orderRouter = Router();

// User routes
orderRouter.post("/initialize",     authMiddleware, orderInitValidator, validate, paymentInitialize);
orderRouter.post("/callbackVerify", paymentCallback);  // Chapa webhook — no auth
orderRouter.get("/verify/:tx_ref",  verifyPayment);
orderRouter.post("/userorders",     authMiddleware, userOrders);

// Admin routes
orderRouter.post("/list",    adminAuthMiddleware, listOrders);
orderRouter.post("/status",  adminAuthMiddleware, updateStatus);
orderRouter.post("/getbyid", adminAuthMiddleware, getOrderById);

export default orderRouter;
