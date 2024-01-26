import path from "path";

export default class HomeController {
  getHomePage(req, res) {
    res.sendFile(path.join(path.resolve(), "views", "home.html"));
  }
}
