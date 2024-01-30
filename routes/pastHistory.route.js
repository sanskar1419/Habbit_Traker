import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";

// 2. Initialize Express router.
const HistoryRouter = express.Router();
HistoryRouter.use(express.static("assets"));
const upload = multer();

const fitnessController = new FitnessController();

HistoryRouter.get("/", (req, res) => {
  fitnessController.viewDetails(req, res);
});

export default HistoryRouter;
