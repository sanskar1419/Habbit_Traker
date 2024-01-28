import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";

// 2. Initialize Express router.
const fitnessRouter = express.Router();
const upload = multer();

const fitnessController = new FitnessController();

fitnessRouter.get("/", (req, res) => {
  fitnessController.getAllhabits(req, res);
});
fitnessRouter.post("/", upload.none(), (req, res) => {
  fitnessController.addNewHabit(req, res);
});

fitnessRouter.post("/delete", (req, res) => {
  fitnessController.deleteExistingHabit(req, res);
});

export default fitnessRouter;
