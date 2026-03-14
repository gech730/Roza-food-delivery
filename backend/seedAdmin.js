import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import adminModel from "./models/adminModel.js";

dotenv.config();

/**
 * Admin Account Seeder
 * Creates a default admin account if none exists
 */

const seedAdmin = async () => {
  try {
    const mongo_url = "mongodb://localhost:27017/FOOD_DELIVERY";
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const adminExists = await adminModel.findOne({ email: "admin@fooddelivery.com" });
    
    if (adminExists) {
      console.log("Admin account already exists");
    } else {
      // Create default admin account
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      const admin = new adminModel({
        name: "Admin",
        email: "admin@fooddelivery.com",
        password: hashedPassword,
      });

      await admin.save();
      console.log("Default admin account created!");
      console.log("Email: admin@fooddelivery.com");
      console.log("Password: admin123");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
