import {Router} from 'express';
import { addFood, readFood, deleteFood, updateFood, getFoodById } from '../controllers/foodController.js';
import multer from 'multer';
import adminAuthMiddleware from '../middleware/adminAuth.js';

const router = Router();

// Storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * Food Routes (Admin Protected)
 * All routes require admin authentication
 */

// POST /api/food/add - Add new food item (requires admin auth + image upload)
router.post("/add", adminAuthMiddleware, upload.single("image"), addFood);

// GET /api/food/get - Get all food items (public)
router.get("/get", readFood);

// DELETE /api/food/remove - Delete food item (requires admin auth)
router.delete("/remove", adminAuthMiddleware, deleteFood);

// POST /api/food/update - Update food item (requires admin auth + optional image)
router.post("/update", adminAuthMiddleware, upload.single("image"), updateFood);

// POST /api/food/getbyid - Get single food item by ID (public)
router.post("/getbyid", getFoodById);

export default router;
