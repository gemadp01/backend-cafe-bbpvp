const express = require("express");
const app = express();
const connectMoongose = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const port = 3000;

console.log(connectMoongose);

connectMoongose();
app.use(express.json());

// app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
