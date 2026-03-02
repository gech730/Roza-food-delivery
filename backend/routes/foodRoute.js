import {Router} from 'express';
import { addFood,readFood ,deleteFood} from '../controllers/foodController.js';
import multer from 'multer';
const router=Router();
// storage configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename:  (req, file, cb)=> {
   return  cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });


router.post("/add",upload.single("image"),addFood);
router.get("/get",readFood);
router.delete("/remove",deleteFood);
export default router;