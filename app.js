require("dotenv").config({ debug: true, encoding: "utf8" });
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

// app.use((req, _res, next) => {
//   console.log(">>", req.method, req.originalUrl);
//   next();
// });

// app.use((req, res) => {
//   console.warn("404 =>", req.method, req.originalUrl);
//   res.status(404).json({ message: "Not Found", path: req.originalUrl });
// });

app.use(
  cors()
  //   {
  //   origin: "http://localhost:5173",
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  // }
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/list-meja", listMejaRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
