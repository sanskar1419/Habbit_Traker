// Importing and creating instances of module and npm packages
import HabitRepository from "../repository/habit.repository.js";
import { body, validationResult } from "express-validator";

// Defining the class name FormDataMiddleware
export default class FormDataMiddleware {
  constructor() {
    // Creating the instance of HabitRepository
    this.habitRepository = new HabitRepository();
  }

  // Method for form validation using express validator
  async formProductValidating(req, res, next) {
    console.log(req.body);
    const rules = [
      body("habitName")
        .isLength({ min: 3 })
        .withMessage(
          "Habit Name is Required and it should not be less then 3 character"
        ),
      body("weeklyTarget")
        .isArray()
        .withMessage("At least one day name need to selected."),
      body("totalTargetDays")
        .isInt({ min: 7, max: 30 })
        .withMessage("Total Targeted Day should be between 7 to 30 Days"),
    ];

    // Run all Validation
    await Promise.all(rules.map((rule) => rule.run(req)));

    // Store validation result
    let validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      const habits = await this.habitRepository.get();
      const todayDate = await this.habitRepository.getCurrentDate();
      res.render("habits", {
        title: "Habits",
        habits: habits,
        errorMessage: validationErrors.array()[0].msg,
        todayDate: todayDate,
      });
    } else {
      next();
    }
  }
}
