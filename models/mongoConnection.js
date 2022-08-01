const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectMongo = async () => {
  try {
    const CS = process.env["ATLAS_API_KEY"];
    await mongoose.connect(CS);
    console.log("connection to mongo was established");
  } catch (error) {
    console.log("error connectiong with mongo");
  }
};

module.exports = { connectMongo };
