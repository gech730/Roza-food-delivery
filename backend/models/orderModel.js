import mongoose from 'mongoose';
const orderSchema=new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: String,
      },
    ],

    // Pricing
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    // Delivery info
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      region: String,
      postalCode: String,
    },

    // Payment info (Chapa)
    paymentMethod: {
      type: String,
      default: "Chapa",
    },

    paymentResult: {
      tx_ref: String,
      chapa_ref: String,
      status: String,
      payment_status: String,
      email: String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    // Order status
    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },

    // Chapa tracking
    tx_ref: {
      type: String,
      required: true,
      unique: true,
    },

    chapa_verify_data: {
      type: Object,
    },
}, { timestamps: true   }
);
const orderModel= mongoose.models.orderModel || mongoose.model("orderModel",orderSchema);
export default orderModel;