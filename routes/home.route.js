// Importing and creating instances of module and npm packages
import express from "express";
import HomeController from "../controller/home.controller.js";

// Initialize Express router.
const homeRouter = express.Router();

// Creating Instances for HomeController
const homeController = new HomeController();

// Handling all the request
homeRouter.get("/", homeController.getHomePage);

// Exporting homeRouter
export default homeRouter;
