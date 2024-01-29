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
        errorMessage: null,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async addNewHabit(req, res) {
    try {
      let { habitName, totalTargetDays, weeklyTarget } = req.body;
      const newHabit = new HabitModel(habitName, totalTargetDays, weeklyTarget);
      const result = await this.habitRepository.add(newHabit);
      if (!result) {
        res.redirect("/habit/");
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
