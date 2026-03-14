import jwt from "jsonwebtoken";

const adminAuthMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  
  if (!token) {
    return res.json({ success: false, message: "Not authorized. Please login again." });
  }
  
  try {
    // Verify the JWT token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = token_decode.id;
    next();
  } catch (error) {
    console.log("Admin auth error:", error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuthMiddleware;
