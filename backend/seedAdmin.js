import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import adminModel from "./models/adminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Always recreate admin with the correct password
    await adminModel.deleteOne({ email: "admin@fooddelivery.com" });

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await adminModel.create({
      name: "Admin",
      email: "admin@fooddelivery.com",
      password: hashedPassword,
    });

    console.log("Admin account ready!");
    console.log("Email:    admin@fooddelivery.com");
    console.log("Password: admin123");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
