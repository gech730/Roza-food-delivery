import { Router } from "express";
import { addFood, readFood, deleteFood, updateFood, getFoodById } from "../controllers/foodController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = Router();

/**
 * Food Routes (Admin Protected)
 */

// POST /api/food/add - Add new food item (requires admin auth + image upload to Cloudinary)
router.post("/add", adminAuthMiddleware, upload.single("image"), addFood);

// GET /api/food/get - Get all food items (public)
router.get("/get", readFood);

// DELETE /api/food/remove - Delete food item (requires admin auth)
router.delete("/remove", adminAuthMiddleware, deleteFood);

// POST /api/food/update - Update food item (requires admin auth + optional image upload)
router.post("/update", adminAuthMiddleware, upload.single("image"), updateFood);

// POST /api/food/getbyid - Get single food item by ID (public)
router.post("/getbyid", getFoodById);

export default router;
