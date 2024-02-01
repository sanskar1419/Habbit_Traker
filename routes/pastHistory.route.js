// Importing and creating instances of module and npm packages
import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";

// Initialize Express router.
const HistoryRouter = express.Router();

// Publicly accessible the asset folder
HistoryRouter.use(express.static("assets"));
const upload = multer();

// Creating Instances for FitnessController
const fitnessController = new FitnessController();

// Handling all the request
HistoryRouter.get("/", (req, res) => {
  fitnessController.viewDetails(req, res);
});

// Exporting HistoryRouter
export default HistoryRouter;
