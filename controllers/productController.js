const Product = require("../models/Product.js");
const fs = require("fs");

// Create Product
const createProduct = async (req, res) => {
  const {
    productName,
    productCategory,
    productPrice,
    productQuantity,
    productImage,
    productStatus,
  } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // if (!req.file) {
  //   return res.status(400).json({ message: "No image uploaded" });
  // }

  try {
    const product = await Product.create({
      productName,
      productCategory,
      productPrice,
      productQuantity,
      // productImage: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      productImage: `${req.file.filename}`,
      productStatus,
      user: req.user.id,
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

//! Get All Products (user)
const getProducts = async (req, res) => {
  try {
    if (req.query.search) {
      const products = await Product.find({
        // $regex = regular expression sedangkan $options: "i" artinya case insensitive (tidak peduli huruf besar/kecil)
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
    // const products = await Product.find({ user: req.user.id }).populate("user");
    // console.log(req.user);
    const products = await Product.find({
      user: req.user.id,
    });
    if (products.length === 0) {
      return res.status(200).json(null);
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! Get Product By Id (user)
const getProductById = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const skip = (page - 1) * limit;

    const query = { user: req.params.id };

    // Ambil data user dengan pagination
    const products = await Product.find(query).skip(skip).limit(Number(limit));

    // Hitung total data (untuk frontend bikin total pages)
    const total = await Product.countDocuments(query);

    return res.status(200).json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // try {
  //   const products = await Product.find({ user: req.params.id });

  //   res.status(200).json(products);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};

// Get Product By Specific id
const getProductBySpecificId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};

// Update Product By Id
const updateProductById = async (req, res) => {
  const {
    productName,
    productCategory,
    productPrice,
    productQuantity,
    productImage,
    productStatus,
  } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied. You can only update your own products",
      });
    }

    const updateData = {
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productStatus,
    };

    if (req.file) {
      updateData.productImage = req.file.filename;
    } else if (productImage) {
      updateData.productImage = productImage;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};

// Delete Product By Id
const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product tidak ditemukan" });

    // jika ada file, hapus dari disk
    if (product.productImage) {
      const imagePath =
        process.cwd() + "/public/uploads/" + product.productImage;

      fs.unlink(imagePath, (err) => {
        if (err) console.log("Gagal hapus file:", err);
        else console.log("Berhasil hapus:", imagePath);
      });
    }

    await product.deleteOne();
    res.json({ message: "Product berhasil dihapus" });
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
  getProductBySpecificId,
  updateProductById,
  deleteProductById,
};
