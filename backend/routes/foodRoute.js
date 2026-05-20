import {Router} from 'express';
import { addFood, readFood, deleteFood, updateFood, getFoodById } from '../controllers/foodController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import adminAuthMiddleware from '../middleware/adminAuth.js';

const router = Router();

// Resolve uploads directory relative to this file so it works regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Sanitise original filename to avoid spaces / special chars
    const ext      = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, safeName);
  },
});

// Only allow image files, max 5 MB
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

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
