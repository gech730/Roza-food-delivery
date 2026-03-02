import {Router} from 'express';
import { addFood,readFood } from '../controllers/foodController.js';
const router=Router();
router.post("/add",addFood);
router.get("/get",readFood);
export default router;