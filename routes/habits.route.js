import express from "express";
import FitnessController from "../controller/habits.controller.js";

// 2. Initialize Express router.
const fitnessRouter = express.Router();

const fitnessController = new FitnessController();

fitnessRouter.get("/", (req, res) => {
  fitnessController.getAllhabits(req, res);
});
fitnessRouter.post("/", (req, res) => {
  fitnessController.addNewHabit(req, res);
});

fitnessRouter.post("/delete", (req, res) => {
  fitnessController.deleteExistingHabit(req, res);
});

export default fitnessRouter;
