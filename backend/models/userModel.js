import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
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
  cartData: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default userModel;
