const ListMeja = require("../models/ListMeja.js");

// create list meja
const createListMeja = async (req, res) => {
  // console.log(req.body);
  const date = new Date(req.body.waktuPemesanan);
  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  try {
    const listMeja = await ListMeja.create({
      noMeja: req.body.noMeja,
      waktuPemesanan: formattedDate,
      status: req.body.status,
      note: req.body.note,
      user: req.user.id,
    });
    res.status(201).json({ message: "List meja created" });
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

    if (listMeja.length === 0) {
      return res.status(200).json(null);
    }
    res.status(200).json(listMeja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get list meja by id
const getListMejaById = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const skip = (page - 1) * limit;

    const query = { user: req.params.id };

    // Ambil data user dengan pagination
    const listMeja = await ListMeja.find(query).skip(skip).limit(Number(limit));

    // Hitung total data (untuk frontend bikin total pages)
    const total = await ListMeja.countDocuments(query);

    return res.status(200).json({
      listMeja,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // try {
  //   const listMeja = await ListMeja.find({ user: req.params.id });
  //   res.status(200).json(listMeja);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
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
