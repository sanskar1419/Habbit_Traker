import app from "./index.js";

const port = 8000;
app.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});
