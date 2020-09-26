const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

router.post("/create", async (req, res) => {
  const userData = req.body.userData;
  const username = userData.username;
  const password = userData.password;

  if (!userData) {
    return res.status(400).send({ msg: "User data not passed" });
  }

  const usernameDB = await User.find({ username });
  if (usernameDB.length) {
    return res.status(400).send({ msg: "Username taken" });
  }

  const hash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ ...userData, password: hash });

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ user, token });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  const comparePwd = await bcrypt.compare(password.user.password);
  if (!comparePwd) {
    return res.status(400).send({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ user, token });
});

module.exports = router;
