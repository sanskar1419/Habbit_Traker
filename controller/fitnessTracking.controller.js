import path from "path";

export default class FitnessController {
  getTrackingPage(req, res) {
    res.status(200).send("Fitness page");
  }
}
