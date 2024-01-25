import express from "express";
import HomeController from "../controller/home.controller.js";

// 2. Initialize Express router.
const homeRouter = express.Router();

const homeController = new HomeController();

homeRouter.get("/", homeController.getHomePage);

export default homeRouter;
