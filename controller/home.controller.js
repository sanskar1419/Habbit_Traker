export default class HomeController {
  getHomePage(req, res) {
    res.status(200).send("Welcome Fitness tracking website page");
  }
}
