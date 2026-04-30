import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // Profile image filename stored in uploads folder
  profileImage: {
    type: String,
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Create or reuse the model
const adminModel = mongoose.models.adminModel || mongoose.model("adminModel", adminSchema);

export default adminModel;
