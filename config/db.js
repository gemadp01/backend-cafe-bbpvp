const mongoose = require("mongoose");

const connectMoongose = async () => {
  mongoose
    .connect(
      "mongodb://localhost:27017/backend-cafe-bbpvp"
      // {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //     useCreateIndex: true,
      // }
    )
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error);
    });
};

module.exports = connectMoongose;
