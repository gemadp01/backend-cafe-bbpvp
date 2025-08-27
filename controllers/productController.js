const Product = require("../models/Product.js");

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productImage,
      productStatus,
      userId,
    } = req.body;

    const product = await Product.create({
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productImage,
      productStatus,
      user: userId,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all products by query param
// const getProductsByQuery = async (req, res) => {
//   try {
//     console.log(req.query.search);
//     const products = await Product.find(req.query);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Get All Products
const getProducts = async (req, res) => {
  try {
    if (req.query.search) {
      const products = await Product.find({
        productName: { $regex: req.query.search, $options: "i" },
      }).populate("user", { namaCafe: 1, lokasiCafe: 1, noTelp: 1 });
      return res.status(200).json(products);
    }

    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get All Products By User
const getAllProductsByUserLoggedIn = async (req, res) => {
  try {
    const products = await Product.find({ user: req.params.id }).populate(
      "user"
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Product By Id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product By Id
const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        productPrice: req.body.productPrice,
        productQuantity: req.body.productQuantity,
        productImage: req.body.productImage,
        productStatus: req.body.productStatus,
      },

      {
        new: true,
      }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product By Id
const deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  // getProductsByQuery,
  getAllProductsByUserLoggedIn,
  getProductById,
  updateProductById,
  deleteProductById,
};
