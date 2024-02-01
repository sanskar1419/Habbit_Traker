// Importing and creating instances of module and npm packages
import mongoose from "mongoose";

// Defining Status Schema
export const habitStatusSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    dateStatus: {
      type: String,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
    },
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we will access the db
const Status = mongoose.model("Status", habitStatusSchema);

// Exporting Status
export default Status;
