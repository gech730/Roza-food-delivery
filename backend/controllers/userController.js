import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import fs from "fs";

/**
 * Create JWT Token
 * Generates authentication token for user
 */
const createToken = (userId) => {
  const sign = jwt.sign({ userId }, process.env.JWT_SECRET);
  return sign;
};


const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password required" });
    }
    
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist!" });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    
    const token = createToken(user._id);

    res.json({ 
      success: true, 
      token, 
      userId: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
    });
  } catch (error) {
    console.log("Login error:", error);
    res.json({ success: false, message: "Login error" });
  }
};


 //  Creates new user account
 
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please use a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ 
        success: false, 
        message: "Password must be at least 8 characters" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user with empty cart
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      cartData: {},
      profileImage: null
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ 
      success: true, 
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
    });
  } catch (error) {
    console.log("Register error:", error);
    res.json({ success: false, message: "Registration error" });
  }
};


//  Get User Profile
 
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId).select("-password");
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    res.json({ 
      success: true, 
      data: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    console.log("Get profile error:", error);
    res.json({ success: false, message: "Error fetching profile" });
  }
};

//  Update User Profile

 
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { name, email } = req.body;
    
    // Validate input
    if (!name && !email && !req.file) {
      return res.json({ success: false, message: "Name, email, or image required" });
    }
    
    // If email is being updated, validate format and uniqueness
    if (email) {
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Invalid email format" });
      }
      
      const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.json({ success: false, message: "Email already in use" });
      }
    }
    
    // Get existing user for image handling
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    };
    
 
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    if (req.file) {
      // Delete old image if exists
      if (existingUser.profileImage) {
        const oldImagePath = `uploads/${existingUser.profileImage}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = req.file.filename;
    }
    
 
    const updatedUser = await userModel.findByIdAndUpdate(
      userId, 
      updateData,
      { new: true }
    ).select("-password");
    
    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.log("Update profile error:", error);
    res.json({ success: false, message: "Error updating profile" });
  }
};

// Change User Password

const changePassword = async (req, res) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.json({ success: false, message: "Current and new password required" });
    }
    
    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }
    
    if (newPassword.length < 8) {
      return res.json({ 
        success: false, 
        message: "New password must be at least 8 characters" 
      });
    }
    

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
    
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log("Change password error:", error);
    res.json({ success: false, message: "Error changing password" });
  }
};

export { 
  login, 
  register,
  getUserProfile,
  updateUserProfile,
  changePassword
};
