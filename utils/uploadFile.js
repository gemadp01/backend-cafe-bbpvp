const multer = require("multer");
const path = require("path");

// Set tempat penyimpanan file
const storage = multer.diskStorage({
  // destination for files
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // folder tujuan
  },

  // add back the extension
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // contoh: 1693308391.png
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".jpg", ".jpeg", ".png"];

  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file JPG dan PNG yang diperbolehkan"), false);
  }
};

// upload parameters for multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // maksimal 1MB
  fileFilter: fileFilter,
});

module.exports = upload;
