// Importing and creating instances of module and npm packages
import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";

// Initialize Express router.
const ToggleRouter = express.Router();

// Publicly accessible the asset folder
ToggleRouter.use(express.static("assets"));
const upload = multer();

// Creating Instances for FitnessController
const fitnessController = new FitnessController();

// Handling all the request
ToggleRouter.post("/", upload.none(), (req, res) => {
  fitnessController.toggleStatus(req, res);
});

// Exporting ToggleRouter
export default ToggleRouter;
