const express = require("express");
const {
  createListMeja,
  getListMeja,
  getListMejaByUserLoggedIn,
  getListMejaById,
  getListMejaBySpecificMejaId,
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
router.get("/update/:listMejaId", getListMejaBySpecificMejaId);
router.put("/:listMejaId", updateListMejaById);
router.delete("/:listMejaId", deleteListMejaById);

module.exports = router;
