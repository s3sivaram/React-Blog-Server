// This route is for http://localhost:3001/user

const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sequelize } = require("../models");
const { Users } = require("../models");
const router = require("express").Router();
const checkAuth = require("../Helper/checkAuth");
const { sign } = require("jsonwebtoken");

//  This route is for http://localhost:3001/user
router.get("/", (req, res) => {
  console.log("This is the user route");
  res.cookie("usercookie", "ss", { maxAge: 1000 * 60 * 60, httpOnly: true });
  res.send("This is the user route");
});

//  This route is for http://localhost:3001/user/login
router.post("/login", async (req, res) => {
  console.log("login cookie", req.cookies);
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username } });
  if (!user) {
    console.log("user not found", user);
    res.json({ message: "user not found" });
  } else {
    const result = await bcrypt.compare(password, user.password);
    console.log("result", result);
    if (result) {
      const token = sign({ username: username }, "jwtsecret");
      console.log("username jwt=", token);
      res.send({ message: "Login successful", token: token, user: username });
    } else {
      res.json({ message: "Password did not match" });
    }
  }
});

//  This route is for http://localhost:3001/user/register
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedpassword = await bcrypt.hash(password, saltRounds);
  try {
    const u = await Users.create({
      username: username,
      password: hashedpassword,
      email: email,
    });

    res.send(`" user registered " ${username} ${password}`);
  } catch (error) {
    console.log("sql error", error.errors[0].message);
    res.send(error.errors[0].message);
  }
});

// This route is for http://localhost:3001/user/profile
router.get("/profile", checkAuth, (req, res) => {
  res.send({ message: "true", user: req.user });
});

// router.get("/logout", (req, res) => {
//   req.logout();
// });

module.exports = router;
