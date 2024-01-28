import path from "path";
import HabitRepository from "../repository/habit.repository.js";
import HabitModel from "../model/habits.model.js";

export default class FitnessController {
  constructor() {
    this.habitRepository = new HabitRepository();
  }
  async getAllhabits(req, res) {
    try {
      const habits = await this.habitRepository.get();
      // res.status(200).send(habits);
      res.render("habits", {
        title: "Habits",
        habits: habits,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async addNewHabit(req, res) {
    try {
      let { habitName, totalTargetDays, weeklyTarget } = req.body;
      // console.log(habitName);
      // console.log(totalTargetDays);
      // console.log(weeklyTarget);
      const newHabit = new HabitModel(habitName, totalTargetDays, weeklyTarget);
      const result = await this.habitRepository.add(newHabit);
      if (!result) {
        return res.status(201).send("Record already Exist");
      } else {
        res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async deleteExistingHabit(req, res) {
    try {
      // console.log("Request is recieved");
      const { id } = req.query;
      // console.log(id);
      await this.habitRepository.delete(id);
      res.redirect("back");
      // res.send("Habit Deleted");
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }
}
