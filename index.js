const express = require("express");
const app = express();
const port = 5555;

app.get("/", (req, res) => {
  res.send("Hello ExpressJs 1");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
