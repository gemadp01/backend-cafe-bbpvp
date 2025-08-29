const express = require("express");
const {
  createListMeja,
  getListMeja,
  getListMejaByUserLoggedIn,
  getListMejaById,
  updateListMejaById,
  deleteListMejaById,
} = require("../controllers/listMejaController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getListMeja);
router.get("/:id", getListMejaById);

// protected
router.use(auth);
router.post("/create", createListMeja);
router.get("/user/login", getListMejaByUserLoggedIn);
router.put("/:id", updateListMejaById);
router.delete("/:id", deleteListMejaById);

module.exports = router;
