const multer = require("multer");

// setup storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder simpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // biar nama unik
  },
});

const upload = multer({ storage });

module.exports = upload;
