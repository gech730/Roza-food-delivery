import {Router} from 'express'
import { placeOrder } from '../controllers/orderController';
import authMiddleware from '../middleware/auth'
const orderRouter = Router();
orderRouter.post('/place',authMiddleware,placeOrder);