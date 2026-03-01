import {Router} from 'express';
import foodModel from '../models/foodModel.js';
const router=Router();
router.post("/add",foodModel);
export default router;