import "./env.js";
import express from "express";
import homeRouter from "./routes/home.route.js";
import fitnessRouter from "./routes/habits.route.js";
import bodyParser from "body-parser";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";

const app = new express();

app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

app.use(expressEjsLayouts);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", homeRouter);
app.use("/habit", fitnessRouter);

export default app;
