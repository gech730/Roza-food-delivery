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

// Ensure uploads folder exists on fresh deploys
try { mkdirSync("uploads", { recursive: true }); } catch (_) {}

const app = express();
const PORT = process.env.PORT || 4000;

const rawOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
];

const allowedOrigins = rawOrigins
  .filter(Boolean)
  .map(o => o.replace(/\/$/, ""));   // strip trailing slash

console.log("✅ Allowed CORS origins:", allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    const clean = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(clean)) {
      return callback(null, true);
    }

    console.warn("🚫 CORS blocked:", origin);
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};

// CORS must be FIRST — before everything else
app.use(cors(corsOptions));

// Handle preflight OPTIONS for all routes
// Express 5 compatible — use a middleware instead of app.options("*")
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,token");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  next();
});

/* ── SECURITY ─────────────────────────────────────────────────────────────── */
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

/* ── BODY PARSING ─────────────────────────────────────────────────────────── */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ── LOGGING ──────────────────────────────────────────────────────────────── */
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

/* ── RATE LIMITING ────────────────────────────────────────────────────────── */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many login attempts, please try again later." },
});

app.use(globalLimiter);
app.use("/api/user/login",    authLimiter);
app.use("/api/user/register", authLimiter);
app.use("/api/admin/login",   authLimiter);

/* ── STATIC FILES ─────────────────────────────────────────────────────────── */
app.use("/images", express.static("uploads"));

/* ── DATABASE ─────────────────────────────────────────────────────────────── */
connectDB();

/* ── ROUTES ───────────────────────────────────────────────────────────────── */
app.use("/api/food",  foodRouter);
app.use("/api/user",  userRouter);
app.use("/api/cart",  cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

/* ── HEALTH CHECK ─────────────────────────────────────────────────────────── */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ── 404 ──────────────────────────────────────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

/* ── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────── */
app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

/* ── START ────────────────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`🚀 Server on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
