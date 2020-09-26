const router = require("express").Router();
const Vendor = require("../models/vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

router.post("/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username.trim().length < 6) {
    return res
      .status(400)
      .send({ msg: "Username length must be greater than 5" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ msg: "Password length must be greater than 5" });
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    Vendor.find({ username }, (err, users) => {
      if (err) {
        return res.status(500).send({ err });
      }
      if (users.length) {
        return res.status(400).send({ msg: "Username already taken" });
      }
      Vendor.create({ username, password: hash }, (err, user) => {
        if (err) {
          return res.status(500).send({ err });
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.send({ user, token });
      });
    });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Vendor.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).send({ err });
    }
    bcrypt.compare(password, user.password, (err, hashRes) => {
      if (!hashRes) {
        return res.status(400).send({ msg: "Invalid password" });
      }
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res.send({ user, token });
    });
  });
});

module.exports = router;
