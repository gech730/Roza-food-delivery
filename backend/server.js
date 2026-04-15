import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { mkdirSync } from "fs";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import dotenv from "dotenv";

dotenv.config();

// Ensure uploads directory exists (needed on fresh deploys)
try { mkdirSync("uploads", { recursive: true }); } catch {}

const app = express();
const PORT = process.env.PORT || 4000;

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://roza-frontend.vercel.app",
    "https://roza-admin.vercel.app"
  ],
  credentials: true
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── HTTP request logging ──────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ── Rate limiting ─────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV || "development"}]`);
});
 message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

.json({
    success: false,
   0;
  res.status(status)}:`, err.message);
  const status = err.status || 50 => {
  console.error(`[ERROR] ${req.method} ${req.path────────
app.use((err, req, res, next)─────────────────────────────────────
// ── Global error handler ─────────"Route not found" });
});
 message: .use((req, res) => {
  res.status(404).json({ success: false,─────────────────────────────────────────────
app);

// ── 404 handler ──────────────────"ok", timestamp: new Date().toISOString() });
}get("/health", (req, res) => {
  res.json({ status: ────────────────────────────────────────────────
app./ ── Health check ──────────────"/api/admin", adminRouter);

/"/api/order", orderRouter);
app.use(art",  cartRouter);
app.use(("/api/coodRouter);
app.use("/api/user",  userRouter);
app.use───────────────────
app.use("/api/food",  f───────────────────────────────────────────────
// ── Routes ────────────────────────────
connectDB();
────────────────se ────────────────────────

// ── Databatic("uploads"));("/images", express.sta────────
app.use─────────────────────────────────────c files ─────────────────// ── StatiLimiter);

",   auth  max: 20,
  message: { success: false, message: "Too many login attempts, please try again later." },
});

app.use(globalLimiter);
app.use("/api/user/login",    authLimiter);
app.use("/api/user/register", authLimiter);
app.use("/api/admin/login