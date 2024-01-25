import express from "express";
import homeRouter from "./routes/home.route.js";
import fitnessRouter from "./routes/fitnessTracking.route.js";

const app = new express();

app.use(express.static("assets"));

app.use("/", homeRouter);
app.use("/fitness", fitnessRouter);

export default app;
