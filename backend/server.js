import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Static folder for uploaded images
app.use("/images", express.static("uploads"));

/**
 * API Routes
 * 
 * - /api/food - Food CRUD operations
 * - /api/user - User authentication & profile
 * - /api/cart - Shopping cart operations
 * - /api/order - Order management
 * - /api/admin - Admin authentication
 */
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

// Start server
app.listen(4000, () => {
  try {
    console.log("Server running on http://localhost:4000");
    console.log("API Endpoints:");
    console.log("  - POST /api/user/register");
    console.log("  - POST /api/user/login");
    console.log("  - POST /api/admin/login");
    console.log("  - GET  /api/food/get");
  } catch (err) {
    console.log("ERROR During server startup:", err);
  }
});
