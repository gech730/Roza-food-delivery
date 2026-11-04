import { Router } from "express";
import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  changePassword,
  listUsers,
  blockUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";
import validate from "../middleware/validate.js";
import { loginValidator, registerValidator } from "../middleware/validators.js";
import upload from "../middleware/upload.js";

const userRouter = Router();

// POST /api/user/login - User login (public)
userRouter.post("/login", loginValidator, validate, login);

// POST /api/user/register - User registration (public)
userRouter.post("/register", registerValidator, validate, register);

// GET /api/user/profile - Get user profile (protected)
userRouter.get("/profile", authMiddleware, getUserProfile);

// PUT /api/user/profile - Update user profile (protected, with optional image upload to Cloudinary)
userRouter.put("/profile", authMiddleware, upload.single("profileImage"), updateUserProfile);

// PUT /api/user/password - Change password (protected)
userRouter.put("/password", authMiddleware, changePassword);

// Admin routes
userRouter.get("/admin/list",   adminAuthMiddleware, listUsers);
userRouter.post("/admin/block", adminAuthMiddleware, blockUser);
userRouter.post("/admin/delete",adminAuthMiddleware, deleteUser);

export default userRouter;
