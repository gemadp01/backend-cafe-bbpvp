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
const upload = require("../utils/uploadFile");
const auth = require("../middleware/auth");

const router = express.Router();

// general
router.get("/", getProducts);
router.get("/:id", getProductById);
// router.get("/", getProductsByQuery);

// protected
router.use(auth);
router.get("/user/login", getAllProductsByUserLoggedIn);
router.post("/create", createProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
