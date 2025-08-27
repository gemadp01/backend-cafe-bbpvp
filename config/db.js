const mongoose = require("mongoose");

const connectMongoose = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/backend-cafe-bbpvp")
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error);
    });
};

module.exports = connectMongoose;
