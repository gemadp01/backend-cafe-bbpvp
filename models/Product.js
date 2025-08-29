const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    productCategory: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productImage: { type: String, required: true },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // referencing ke User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
