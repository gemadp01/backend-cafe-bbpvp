const User = require("../models/User.js");

// get users
const getUsers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // query filter
    let query = {};
    if (search) {
      query = {
        $or: [
          { namaCafe: { $regex: search, $options: "i" } },
          { lokasiCafe: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Ambil data user dengan pagination
    const users = await User.find(query).skip(skip).limit(Number(limit));

    // Hitung total data (untuk frontend bikin total pages)
    const total = await User.countDocuments(query);

    return res.status(200).json({
      users,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update user by id
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
};
