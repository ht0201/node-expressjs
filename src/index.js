const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const { ADMIN, DIRECTOR } = require("./configs");

const app = express();
const port = 5555;

// static scss
app.use(express.static(path.join(__dirname, "public")));

// START middleware :  body-paser : xu ly form, code js
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

const authMiddleWare = (role) => {
  let currentUser = null;
  switch (role) {
    case "ADMIN":
      currentUser = ADMIN;
      break;

    case "DIRECTOR":
      currentUser = DIRECTOR;
      break;

    default:
      currentUser = "";
  }

  return (req, res, next) => {
    if (
      user &&
      user.email === currentUser?.email &&
      user.password === currentUser?.password
    ) {
      return next();
    }

    res.json({ status: false, message: "You don't permission access data !" });
  };
};

// END MIDDLEWARE

// global var
let user = null;
let products = [];

// Route
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.post("/search", (req, res) => {
  console.log(req.body);
  res.send("");
});

app.delete("/products/:id", authMiddleWare("ADMIN"), (req, res) => {
  const { id } = req.params;

  res.setHeader("Content-Type", "json/application");

  const index = products.findIndex((prod) => prod.id === Number(id));

  if (index === -1) {
    res.json({ status: false, message: "ID not found" });
  } else {
    products.splice(index, 1);
    res.json({ status: true, data: products });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  user = { email, password };
  res.json({ status: true });
});

app.get("/products", authMiddleWare("ADMIN"), (req, res) => {
  res.json({ status: true, data: products });
});

app.post("/products", authMiddleWare("DIRECTOR"), (req, res) => {
  const id = Date.now();
  const { name, price } = req.body;
  const product = {
    id,
    name,
    price,
  };
  products.push(product);
  res.json({ status: true, message: "Post successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
