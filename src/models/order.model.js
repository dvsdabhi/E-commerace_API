const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  //   orderItems: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "cartItems",
  //     },
  //   ],
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
  },
  paymentDetails: {
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Pending",
    required: true,
    enum: ["Pending", "Completed", "Rejected"],
  },

  totalItem: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  buyProduct:[],
//   title: {
//     type: String,
//     required: true,
//   },
//   color: {
//     type: String,
//   },
//   sizes: [
//     {
//       name: { type: String },
//       quantity: { type: Number },
//     },
//   ],
//   imageUrl: {
//     type: String,
//   },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
