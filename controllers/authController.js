const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
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
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(user.comparePassword(password));

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  //   const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
  //   res.json({ token });
};

module.exports = {
  register,
  login,
};
