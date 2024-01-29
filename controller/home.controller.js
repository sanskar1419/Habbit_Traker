import path from "path";

export default class HomeController {
  getHomePage(req, res) {
    res.render("home", {
      title: "Habit Tracker",
      errorMessage: null,
    });
  }
}
