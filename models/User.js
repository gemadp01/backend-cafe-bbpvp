const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // firstName: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true } // otomatis nambah createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);
module.exports = User;
