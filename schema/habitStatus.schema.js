import mongoose from "mongoose";

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

const Status = mongoose.model("Status", habitStatusSchema);

export default Status;
