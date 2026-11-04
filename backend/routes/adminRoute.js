import { Router } from "express";
import { 
  adminLogin, 
  adminRegister, 
  getAdminProfile,
  updateAdminProfile,
  updateAdminAvatar,
  changeAdminPassword,
  getDashboardStats,
} from "../controllers/adminController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const adminRouter = Router();

// POST /api/admin/login - Admin login
adminRouter.post("/login", adminLogin);

// POST /api/admin/register 
adminRouter.post("/register", adminRegister);

// GET /api/admin/profile 
adminRouter.get("/profile", adminAuthMiddleware, getAdminProfile);

// POST /api/admin/profile - Profile info update (name, email)
adminRouter.post("/profile", adminAuthMiddleware, updateAdminProfile);

// POST /api/admin/update - Profile update with optional profileImage
adminRouter.post("/update", adminAuthMiddleware, upload.single("profileImage"), updateAdminProfile);

// POST /api/admin/avatar - Avatar upload via Cloudinary
adminRouter.post("/avatar", adminAuthMiddleware, upload.single("avatar"), updateAdminAvatar);

// POST /api/admin/password 
adminRouter.post("/password", adminAuthMiddleware, changeAdminPassword);

// GET /api/admin/dashboard - Analytics stats
adminRouter.get("/dashboard", adminAuthMiddleware, getDashboardStats);

export default adminRouter;
