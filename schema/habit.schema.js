// Importing and creating instances of module and npm packages
import mongoose from "mongoose";

// Defining Habit Schema
export const habitSchema = new mongoose.Schema(
  {
    habitName: {
      type: String,
      maxLength: [25, "Name can't be greater than 25 characters"],
      required: true,
    },
    totalTargetDays: {
      type: Number,
      required: true,
    },
    weeklyTargetDays: {
      type: Array,
      required: true,
    },
    habitStatus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we will access the db
const Habit = mongoose.model("Habit", habitSchema);

// Exporting Habit
export default Habit;
