const express = require("express");
const app = express();
const cors = require("cors");
const connectMongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const listMejaRoutes = require("./routes/listMejaRoutes");
const port = 3000;

connectMongoose();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/uploads", express.static("public/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/list-meja", listMejaRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
