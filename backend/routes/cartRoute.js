import {Router} from 'express'
import  {addToCart,removeCart,getCart} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';
 const cartRouter = Router();
cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.delete('/remove',authMiddleware,removeCart);
cartRouter.get('/get',authMiddleware,getCart);
 export default cartRouter;