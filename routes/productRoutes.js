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

// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
