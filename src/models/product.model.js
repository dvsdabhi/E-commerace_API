const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },
  discountPersent: {
    type: Number,
    default: 0,
  },

  brand: {
    type: String,
    default: "zara",
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sizes: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  childCategory: {
    type: String,
    required: true,
  },
  subChildCategory: {
    type: String,
    required: true,
  },
  // category : {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref : "categories",
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
