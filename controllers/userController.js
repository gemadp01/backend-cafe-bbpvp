const User = require("../models/User.js");

// get users
const getUsers = async (req, res) => {
  try {
    if (req.query.search) {
      const users = await User.find({
        $or: [
          { namaCafe: { $regex: req.query.search, $options: "i" } },
          { lokasiCafe: { $regex: req.query.search, $options: "i" } },
        ],
      });
      return res.status(200).json(users);
    }

    const users = await User.find();
    return res.status(200).json(users);
    res.json(users);
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
