const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

module.exports = router;
