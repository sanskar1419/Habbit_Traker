import express from "express";

const app = new express();

server.get("/", (req, res) => {
  res.send("Welcome to our Inventory Mangement application.");
});

export default app;
