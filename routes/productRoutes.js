const express = require("express");
const {
  getProducts,
  // getProductsByQuery,
  getAllProductsByUserLoggedIn,
  getProductBySpecificId,
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
router.get("/user/loggedin", getAllProductsByUserLoggedIn);
router.get("/update/:id", getProductBySpecificId);
router.post("/create", upload.single("productImage"), createProduct);
router.put("/:id", upload.single("productImage"), updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
