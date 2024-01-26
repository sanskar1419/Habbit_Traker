import mongoose from "mongoose";
import Habit from "../schema/habit.schema.js";

export default class HabitRepository {
  async get() {
    try {
      let habits = await Habit.find({});
      console.log(habits);
      return habits;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async add(newHabit) {
    try {
      //   console.log(newHabit);
      const createdRecord = new Habit(newHabit);
      await createdRecord.save();
      return createdRecord;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async delete(id) {
    try {
      console.log(id);
      console.log(await Habit.deleteOne({ _id: id }));
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }
}
