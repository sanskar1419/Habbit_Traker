// Importing and creating instances of module and npm packages
import app from "./index.js";
import { connectUsingMongoose } from "./config/mongoose.config.js";

const port = 8000;

// Listening to app and stating the server.
app.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
  connectUsingMongoose();
});
