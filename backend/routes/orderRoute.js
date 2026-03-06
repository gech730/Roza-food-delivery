import {Router} from 'express'
import { placeOrder ,verifyPayment,userOrders,listOrders,updateStatus,initializePayment} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js'
const orderRouter = Router();
orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyPayment);
orderRouter.post('/userorders',authMiddleware,userOrders);
orderRouter.post('/list',listOrders);
orderRouter.post('/status',updateStatus);
orderRouter.post("/initialize", initializePayment)
export default orderRouter;