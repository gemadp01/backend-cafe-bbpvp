const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, unique: true },
    namaCafe: { type: String, required: true },
    lokasiCafe: { type: String, required: true },
    noTelp: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  { timestamps: true } // createdAt & updatedAt
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
