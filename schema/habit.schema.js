import mongoose from "mongoose";

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

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
