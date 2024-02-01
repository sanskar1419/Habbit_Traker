// Importing and creating instances of module and npm packages
import "./env.js";
import express from "express";
import homeRouter from "./routes/home.route.js";
import fitnessRouter from "./routes/habits.route.js";
import bodyParser from "body-parser";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";

// Initializing Express
const app = new express();

// Publicly accessible the assets folder
app.use(express.static("assets"));

// Setting up the view engine and path of view folder
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Using Express Ejs Layout
app.use(expressEjsLayouts);

// Defining Body parser for parsing the client data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Redirecting the route
app.use("/", homeRouter);
app.use("/habit", fitnessRouter);

// Exporting the app
export default app;
