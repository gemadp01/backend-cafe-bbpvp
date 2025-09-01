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
router.get("/user/loggedin", getListMejaByUserLoggedIn);
router.put("/:listMejaId", updateListMejaById);
router.delete("/:listMejaId", deleteListMejaById);

module.exports = router;
