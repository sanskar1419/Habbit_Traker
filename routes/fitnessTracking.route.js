import express from "express";
import FitnessController from "../controller/fitnessTracking.controller.js";

// 2. Initialize Express router.
const fitnessRouter = express.Router();

const fitnessController = new FitnessController();

fitnessRouter.get("/", fitnessController.getTrackingPage);

export default fitnessRouter;
