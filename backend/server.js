import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { mkdirSync } from "fs";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";

dotenv.config();

// Ensure uploads folder exists
try { mkdirSync("uploads", { recursive: true }); } catch (_) {}

const app = express();
const PORT = process.env.PORT || 4000;

/* =========================
   ✅ CORS CONFIG (FIXED)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://roza-frontend.vercel.app",
  "https://roza-admin.vercel.app",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow Postman, curl

    const normalizedOrigin = origin.replace(/\/$/, "");

    const isAllowed = allowedOrigins.some(o =>
      o && o.replace(/\/$/, "") === normalizedOrigin
    );

    if (isAllowed) {
      return cb(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      return cb(null, false); // IMPORTANT: do NOT throw error
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

/* =========================
   🔐 SECURITY
========================= */

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/* =========================
   📦 BODY PARSER
========================= */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================
   📊 LOGGING
========================= */

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

/* =========================
   🚦 RATE LIMITING
========================= */

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many login attempts, please try again later.",
  },
});

app.use(globalLimiter);
app.use("/api/user/login", authLimiter);
app.use("/api/user/register", authLimiter);
app.use("/api/admin/login", authLimiter);

/* =========================
   📁 STATIC FILES
========================= */

app.use("/images", express.static("uploads"));

/* =========================
   🗄 DATABASE
========================= */

connectDB();

/* =========================
   🚀 ROUTES
========================= */

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

/* =========================
   ❤️ HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   ❌ 404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   ⚠️ GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

/* =========================
   🟢 START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} [${
      process.env.NODE_ENV || "development"
    }]`
  );
});