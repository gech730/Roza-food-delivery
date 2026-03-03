import {Router} from 'express'
import { add,remove,get } from "../controllers/cartController";
import authMiddleware from '../middleware/auth';
 const cartRouter = Router();
cartRouter.post('/add',authMiddleware,add);
cartRouter.delete('/remove',authMiddleware,remove);
cartRouter.get('/get',authMiddleware,get);
 export default cartRouter;