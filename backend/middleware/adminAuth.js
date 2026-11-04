import jwt from "jsonwebtoken";

const adminAuthMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = token_decode.id;
    next();
  } catch (error) {
    console.warn("[AdminAuth] Token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired admin session. Please log in again." });
  }
};

export default adminAuthMiddleware;
