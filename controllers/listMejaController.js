const ListMeja = require("../models/ListMeja.js");

// create list meja
const createListMeja = async (req, res) => {
  console.log(req.body);

  try {
    const listMeja = await ListMeja.create({
      noMeja: req.body.noMeja,
      waktuPemesanan: req.body.waktuPemesanan,
      status: req.body.status,
      note: req.body.note,
      user: req.user.id,
    });
    res.status(201).json(listMeja);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all list meja
const getListMeja = async (req, res) => {
  try {
    const listMeja = await ListMeja.find();
    res.status(200).json(listMeja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all list meja by user logged in
const getListMejaByUserLoggedIn = async (req, res) => {
  try {
    const listMeja = await ListMeja.find({ user: req.user.id });
    res.status(200).json(listMeja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get list meja by id
const getListMejaById = async (req, res) => {
  try {
    const listMeja = await ListMeja.findById(req.params.id);
    res.status(200).json(listMeja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update list meja by id
const updateListMejaById = async (req, res) => {
  try {
    const listMeja = await ListMeja.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(listMeja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete list meja by id
const deleteListMejaById = async (req, res) => {
  try {
    await ListMeja.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "List meja deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createListMeja,
  getListMejaById,
  getListMeja,
  getListMejaByUserLoggedIn,
  updateListMejaById,
  deleteListMejaById,
};
