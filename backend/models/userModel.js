import mongoose from 'mongoose'
const userSchema = new mongoose.Schema( {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    cartData: {
      type: Object,
      default: {},
    },

    address: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      region: String,
      postalCode: String,
    },
  profileImage: {
    type: String,
    default: null
  },
  
    // Authentication 
    isVerified: {
      type: Boolean,
      default: false,
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
)
const userModel = mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default userModel;
