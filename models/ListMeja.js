const mongoose = require("mongoose");

const listMejaSchema = new mongoose.Schema(
  {
    noMeja: { type: Number, required: true },
    status: { type: String, required: true },
    waktuPemesanan: { type: String, required: true },
    note: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

listMejaSchema.index({ noMeja: 1, user: 1 }, { unique: true });

const ListMeja = mongoose.model("ListMeja", listMejaSchema);

module.exports = ListMeja;
