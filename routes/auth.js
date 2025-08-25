// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  // Sementara langsung cek plain password (real case: pakai bcrypt)
  if (user.password !== password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
