import { Router } from "express";
import { 
  adminLogin, 
  adminRegister, 
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword 
} from "../controllers/adminController.js";

import adminAuthMiddleware from "../middleware/adminAuth.js";
import multer from "multer";

const adminRouter = Router();

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
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
});


// POST /api/admin/login - Admin login
adminRouter.post("/login", adminLogin);

// POST /api/admin/register 
adminRouter.post("/register", adminRegister);

// GET /api/admin/profile 
adminRouter.get("/profile", adminAuthMiddleware, getAdminProfile);

// POST /api/admin/update 
adminRouter.post("/update", adminAuthMiddleware, upload.single("profileImage"), updateAdminProfile);

// POST /api/admin/password 
adminRouter.post("/password", adminAuthMiddleware, changeAdminPassword);

export default adminRouter;
