const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getUsers);

// protected
router.use(auth);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

module.exports = router;
