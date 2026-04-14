import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Admin not found!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      token,
      message: "Admin logged in successfully",
      admin: {
        name: admin.name,
        email: admin.email,
        profileImage: admin.profileImage,
      },
    });
  } catch (error) {
    console.log("Admin login error:", error);
    res.json({ success: false, message: "Login error" });
  }
};

/**
 * Admin Register
 * Creates new admin account (first admin only)
 */
const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    };

    const existAdmin = await adminModel.findOne({ email });
    if (existAdmin) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    // allow only one admin for security
    const adminCount = await adminModel.countDocuments();
    if (adminCount > 1) {
      return res.json({
        success: false,
        message: "Admin registration not allowed",
      });
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
      profileImage: null,
    });

    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
     res.json({
      success: true,
      token,
      message: "Admin registered successfully",
      admin: {
        name: newAdmin.name,
        email: newAdmin.email,
        profileImage: newAdmin.profileImage,
      },
    });
  } catch (error) {
    console.log("Admin register error:", error);
    res.json({ success: false, message: "Registration error" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId;
    const admin = await adminModel.findById(adminId).select("-password");

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    res.json({ success: true, data: admin });
  } catch (error) {
    console.log("Get admin profile error:", error);
    res.json({ success: false, message: "Error fetching profile" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { name, email } = req.body;

    if (!name && !email && !req.file) {
      return res.json({
        success: false,
        message: "Name, email, or image required",
      });
    }

    if (email) {
      const existingAdmin = await adminModel.findOne({
        email,
        _id: { $ne: adminId },
      });
      
      if (existingAdmin) {
        return res.json({ success: false, message: "Email already in use" });
      }
    }

    const existingAdmin = await adminModel.findById(adminId);
    if (!existingAdmin) {
      return res.json({ success: false, message: "Admin not found" });
    }


    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;


    if (req.file) {
      if (existingAdmin.profileImage) {
        const oldImagePath = `uploads/${existingAdmin.profileImage}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = req.file.filename;
    }

    const updatedAdmin = await adminModel
      .findByIdAndUpdate(adminId, updateData, { new: true })
      .select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.log("Update admin profile error:", error);
    res.json({ success: false, message: "Error updating profile" });
  }
};

const changeAdminPassword = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Current and new password required",
      });
    }

    // Find admin
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await adminModel.findByIdAndUpdate(adminId, { password: hashedPassword });

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log("Change admin password error:", error);
    res.json({ success: false, message: "Error changing password" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalOrders,
      totalUsers,
      totalFoods,
      monthOrders,
      revenueAgg,
      monthRevenueAgg,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      orderModel.countDocuments(),
      userModel.countDocuments(),
      foodModel.countDocuments(),
      orderModel.countDocuments({ createdAt: { $gte: startOfMonth } }),
      orderModel.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
      orderModel.aggregate([
        { $match: { createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      orderModel.find().sort({ createdAt: -1 }).limit(5),
      orderModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalFoods,
        monthOrders,
        totalRevenue: revenueAgg[0]?.total || 0,
        monthRevenue: monthRevenueAgg[0]?.total || 0,
        recentOrders,
        ordersByStatus,
      },
    });
  } catch (error) {
    console.log("Dashboard stats error:", error);
    res.json({ success: false, message: "Error fetching stats" });
  }
};

export {
  adminLogin,
  adminRegister,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getDashboardStats,
};
