import HabitRepository from "../repository/habit.repository.js";
import HabitModel from "../model/habits.model.js";
import { body } from "express-validator";

export default class FitnessController {
  constructor() {
    this.habitRepository = new HabitRepository();
  }
  async getAllhabits(req, res) {
    try {
      const habits = await this.habitRepository.get();
      const todayDate = await this.habitRepository.getCurrentDate();
      console.log(todayDate);
      // res.status(200).send(habits);
      res.render("habits", {
        title: "Habits",
        habits: habits,
        errorMessage: null,
        todayDate: todayDate,
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

  async toggleStatus(req, res) {
    try {
      // console.log(req.body);
      // console.log(req.body.dateStatus);
      let { dateStatus } = req.body;
      dateStatus = dateStatus.split(",");
      // console.log(dateStatus);
      await this.habitRepository.toggleDateStatus(dateStatus);
      res.redirect("back");
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }
}
