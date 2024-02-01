// Defining the class name HomeController and all the controller method
export default class HomeController {
  getHomePage(req, res) {
    res.render("home", {
      title: "Habit Tracker",
      errorMessage: null,
    });
  }
}
