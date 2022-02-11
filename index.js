const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./models");
const userroutes = require("./routes/UserRoutes");
const blogroutes = require("./routes/BlogRoutes");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// main route - http://localhost:3001/
app.get("/", (req, res) =>
  res.cookie("newcookie", "s33").send("This is the main route")
);
app.post("/post", (req, res) => {
  res.json("Thanks for posting - ss");
});

// User route - http://localhost:3001/user
app.use("/user", userroutes);

// Blog route - http://localhost:3001/blog
app.use("/blog", blogroutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server listening at port 3001");
  });
});
