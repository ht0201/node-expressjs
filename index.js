const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 5555;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  //   res.send("Hello ExpressJs 1");
  res.send(`<h1> Hello ExpressJs 1 </h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
