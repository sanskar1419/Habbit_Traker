// Importing and creating instances of module and npm packages
import HabitRepository from "../repository/habit.repository.js";
import HabitModel from "../model/habits.model.js";
import { body } from "express-validator";
import Habit from "../schema/habit.schema.js";

// Defining the class name FitnessController and all the controller method
export default class FitnessController {
  constructor() {
    // Creating the instance of HabitRepository
    this.habitRepository = new HabitRepository();
  }
  // Method for rendering habit page
  async getAllhabits(req, res) {
    try {
      const habits = await this.habitRepository.get();
      const todayDate = await this.habitRepository.getCurrentDate();
      // console.log(todayDate);
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
  // Method to add new Habit
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

  // Method to delete a habit
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

  // Method to toggleStatus based on id
  async toggleStatus(req, res) {
    try {
      let { dateStatus } = req.body;
      dateStatus = dateStatus.split(",");
      const result = await this.habitRepository.toggleDateStatus(dateStatus);
      if (result) {
        let habit = await Habit.findOne({ _id: dateStatus[2] }).populate(
          "habitStatus"
        );
        const todayDate = await this.habitRepository.getCurrentDate();
        const sevenDays = await this.habitRepository.getSevenDays(
          habit.createdAt
        );

        // res.redirect("back");
        return res.render("pastDetails", {
          title: "Habit Past History",
          errorMessage: "Can't modify upcoming date. Please come on same date",
          todayDate: todayDate,
          habit: habit,
          sevenDays: sevenDays,
        });
      }
      res.redirect("back");
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  // Method for rendering History and upcoming habit
  async viewDetails(req, res) {
    const { id } = req.query;
    console.log(id);
    let habit = await this.habitRepository.pastHistory(id);
    const todayDate = await this.habitRepository.getCurrentDate();
    const sevenDays = await this.habitRepository.getSevenDays(habit.createdAt);

    // res.redirect("back");
    res.render("pastDetails", {
      title: "Habit Past History",
      errorMessage: null,
      todayDate: todayDate,
      habit: habit,
      sevenDays: sevenDays,
    });
  }
}
