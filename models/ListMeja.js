const mongoose = require("mongoose");

const listMejaSchema = new mongoose.Schema(
  {
    noMeja: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    waktuPemesanan: { type: String, required: true },
    note: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ListMeja = mongoose.model("ListMeja", listMejaSchema);

module.exports = ListMeja;
