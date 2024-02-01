// Importing and creating instances of module and npm packages
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Using the env variable
const url = process.env.DB_URL;

// Configuring mongoose in order to connect to MongoDB
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};
