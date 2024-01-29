import express from "express";
import FitnessController from "../controller/habits.controller.js";
import multer from "multer";
import FormDataMiddleware from "../middleware/newDatamiddleware.js";

// 2. Initialize Express router.
const fitnessRouter = express.Router();
fitnessRouter.use(express.static("assets"));
const upload = multer();

const fitnessController = new FitnessController();
const formDataMiddleware = new FormDataMiddleware();

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

fitnessRouter.post("/toggle-status", upload.none(), (req, res) => {
  fitnessController.toggleStatus(req, res);
});

export default fitnessRouter;
