import {Router} from 'express'
import { placeOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js'
const orderRouter = Router();
orderRouter.post('/place',authMiddleware,placeOrder);
export default orderRouter;