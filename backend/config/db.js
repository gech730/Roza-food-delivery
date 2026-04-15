import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4, // 🔥 VERY IMPORTANT (forces IPv4)
    });

    console.log("✅ Db connected");
  } catch (err) {
    console.log("❌ Db not connected");
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;