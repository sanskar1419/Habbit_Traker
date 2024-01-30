import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";

// 2. Initialize Express router.
const ToggleRouter = express.Router();
ToggleRouter.use(express.static("assets"));
const upload = multer();

const fitnessController = new FitnessController();

ToggleRouter.post("/", upload.none(), (req, res) => {
  fitnessController.toggleStatus(req, res);
});

export default ToggleRouter;
