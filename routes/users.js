const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { response } = require("express");
const capitalAPI = process.env.CAPITALONE_KEY;
const saltRounds = 10;

router.post("/create", async (req, res) => {
  const userData = req.body.userData;
  let {
    username,
    password,
    customer_id,
    account_id,
    balance,
    ...customer
  } = req.body.userData;

  if (!userData) {
    return res.status(400).send({ msg: "User data not passed" });
  }

  const usernameTaken = await User.find({ username });
  if (usernameTaken.length) {
    return res.status(400).send({ msg: "Username taken" });
  }

  if (!username || username.trim().length < 6) {
    return res
      .status(400)
      .send({ msg: "Username length must be greater than 5" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ msg: "Password length must be greater than 5" });
  }

  await axios
    .post(
      `http://api.reimaginebanking.com/customers?key=${capitalAPI}`,
      customer
    )
    .then((response) => {
      const { _id, ...customerData } = response.data.objectCreated;
      customer = { ...customerData, customer_id: _id };
    })
    .catch((err) => res.status(500).send({ err }));

  const account = {
    type: "Credit Card",
    nickname: username,
    rewards: 0,
    balance: 100,
  };

  await axios
    .post(
      `http://api.reimaginebanking.com/customers/${customer.customer_id}/accounts?key=${capitalAPI}`,
      account
    )
    .then((response) => {
      const { _id } = response.data.objectCreated;
      account_id = _id;
    })
    .catch((err) => res.status(400).send({ err }));

  const hash = await bcrypt.hash(password, saltRounds);
  await User.create({
    ...customer,
    username,
    password: hash,
    account_id,
    balance: account.balance,
  });

  const user = await User.findOne({ username }).select({
    _id: 0,
    __v: 0,
    password: 0,
  });
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ user, token });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username }).select({
    _id: 0,
    __v: 0,
    password: 0,
  });
  if (!user) {
    res.status(400).send({ msg: "Username not found" });
  }

  const hashedPwd = await User.findOne({ username });
  const comparePwd = await bcrypt.compare(password, hashedPwd.password);
  if (!comparePwd) {
    return res.status(400).send({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ user, token });
});

module.exports = router;
