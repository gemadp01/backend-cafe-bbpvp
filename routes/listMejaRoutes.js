const express = require("express");
const {
  createListMeja,
  getListMeja,
  getListMejaByUserLoggedIn,
  getListMejaById,
  updateListMejaById,
  deleteListMejaById,
} = require("../controllers/listMejaController");

const router = express.Router();

router.post("/", createListMeja);
router.get("/", getListMeja);
router.get("/user/:id", getListMejaByUserLoggedIn);
router.get("/:id", getListMejaById);
router.put("/:id", updateListMejaById);
router.delete("/:id", deleteListMejaById);

module.exports = router;
