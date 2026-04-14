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
import multer from "multer";

const userRouter = Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },

  fileFilter: (req, file, cb) => {
    // Allow only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// POST /api/user/login - User login (public)
userRouter.post("/login", loginValidator, validate, login);

// POST /api/user/register - User registration (public)
userRouter.post("/register", registerValidator, validate, register);

// GET /api/user/profile - Get user profile (protected)
userRouter.get("/profile", authMiddleware, getUserProfile);

// PUT /api/user/profile - Update user profile (protected, with optional image upload)
userRouter.put("/profile",authMiddleware,upload.single("profileImage"),updateUserProfile,);

// PUT /api/user/password - Change password (protected)
userRouter.put("/password", authMiddleware, changePassword);

// Admin routes
userRouter.get("/admin/list",   adminAuthMiddleware, listUsers);
userRouter.post("/admin/block", adminAuthMiddleware, blockUser);
userRouter.post("/admin/delete",adminAuthMiddleware, deleteUser);

export default userRouter;
