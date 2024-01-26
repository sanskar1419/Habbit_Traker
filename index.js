import "./env.js";
import express from "express";
import homeRouter from "./routes/home.route.js";
import fitnessRouter from "./routes/habits.route.js";
import bodyParser from "body-parser";

const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("assets"));

app.use("/", homeRouter);
app.use("/habit", fitnessRouter);

export default app;
