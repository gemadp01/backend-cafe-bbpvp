const express = require("express");
// const Product = require("../models/Product.js");
const {
  getProducts,
  // getProductsByQuery,
  getAllProductsByUserLoggedIn,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

const router = express.Router();

// general
router.get("/", getProducts);
router.get("/:id", getProductById);
// router.get("/", getProductsByQuery);

// protected
router.post("/", createProduct);
router.get("/user/:id", getAllProductsByUserLoggedIn);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
