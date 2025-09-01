const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password, email, namaCafe, lokasiCafe, noTelp } =
      req.body;
    const existingCafe = await User.findOne({ namaCafe });
    if (existingCafe) {
      return res.status(400).json({ message: "Cafe already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      passwordHash,
      email,
      namaCafe,
      lokasiCafe,
      noTelp,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const { username, password } = req.body;

  // cek user ada gak
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // cek password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  // generate token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, userId: user._id });
  // res.status(200).json({ message: "Login successful" });
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  register,
  login,
  logout,
};
