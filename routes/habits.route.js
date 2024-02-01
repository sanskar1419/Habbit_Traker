// Importing and creating instances of module and npm packages
import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";
import FormDataMiddleware from "../middleware/newDatamiddleware.js";
import HistoryRouter from "./pastHistory.route.js";
import ToggleRouter from "./toggleTask.js";

// Initialize Express router.
const fitnessRouter = express.Router();

// Publicly accessible the asset folder
fitnessRouter.use(express.static("assets"));
const upload = multer();

// Creating Instances for FitnessController and FormDataMiddleware
const fitnessController = new FitnessController();
const formDataMiddleware = new FormDataMiddleware();

// Handling all the request
fitnessRouter.get("/", (req, res) => {
  fitnessController.getAllhabits(req, res);
});
fitnessRouter.post(
  "/",
  upload.none(),
  (req, res, next) => {
    formDataMiddleware.formProductValidating(req, res, next);
  },
  (req, res) => {
    fitnessController.addNewHabit(req, res);
  }
);

fitnessRouter.post("/delete", (req, res) => {
  fitnessController.deleteExistingHabit(req, res);
});

// Redirecting the request to HistoryRouter and ToggleRouter
fitnessRouter.use("/toggle-status", ToggleRouter);
fitnessRouter.use("/past-details", HistoryRouter);

// Exporting fitnessRouter
export default fitnessRouter;
