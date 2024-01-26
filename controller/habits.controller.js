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
      res.status(200).send(habits);
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async addNewHabit(req, res) {
    try {
      // console.log(req.body);
      const { habitName, totalTargetDays, weeklyTarget } = req.body;
      const newHabit = new HabitModel(habitName, totalTargetDays, weeklyTarget);
      const result = await this.habitRepository.add(newHabit);
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async deleteExistingHabit(req, res) {
    try {
      const { id } = req.query;
      await this.habitRepository.delete(id);
      res.send("Habit Deleted");
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }
}
