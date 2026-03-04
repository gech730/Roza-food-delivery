import jwt from 'jsonwebtoken';

const authMiddleware= async (req,res,next)=>{
    const {token} =req.headers;
    if (!token) {
        return res.json({success:false,message:"not Authorized Login again"})
    }
    try {
        const token_decode=  jwt.verify(token,process.env.JWT_SECRET);
        req.userId=token_decode.userId;
        //  if (token_decode)
        //  return res.json({success:true,rid:token_decode.userId,body:req.body.userId});
        //  req.body.userId=token_decode.userId;
         next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export default authMiddleware;