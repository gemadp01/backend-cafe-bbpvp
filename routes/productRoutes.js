const express = require("express");
// const Product = require("../models/Product.js");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
