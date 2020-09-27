const router = require("express").Router();
const Vendor = require("../models/vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;
const saltRounds = 10;

router.post("/create", async (req, res) => {
  const {
    username,
    vendorName,
    password,
    merchant_id,
    ...merchant
  } = req.body.vendorData;

  if (!username || username.trim().length < 6) {
    return res
      .status(400)
      .send({ msg: "Username length must be greater than 5" });
  }

  if (!vendorName || vendorName.trim().length < 6) {
    return res
      .status(400)
      .send({ msg: "Vendor name length must be greater than 5" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ msg: "Password length must be greater than 5" });
  }

  const hash = await bcrypt.hash(password, saltRounds);
  const usernameDB = await Vendor.find({ username });
  const vendorNameDB = await Vendor.find({ vendorName });

  if (usernameDB.length || vendorNameDB.length) {
    const msg = usernameDB.length ? "Username taken" : "Vendor name taken";
    return res.status(400).send({ msg });
  }

  let merchantData = null;
  await axios
    .post(
      `http://api.reimaginebanking.com/merchants?key=${capitalAPI}`,
      merchant
    )
    .then((response) => {
      const { _id, ...data } = response.data.objectCreated;
      merchantData = { ...data, merchant_id: _id };
    })
    .catch((err) => res.status(400).send({ err }));

  const user = await Vendor.create({
    username,
    vendorName,
    password: hash,
    ...merchantData,
  });
  const token = jwt.sign({ username, vendorName }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ user, token });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Vendor.findOne({ username });
  if (!user) {
    return res.status(400).send({ msg: "Username not found" });
  }

  const compareRes = await bcrypt.compare(password, user.password);
  if (!compareRes) {
    return res.status(400).send({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ user, token });
});

module.exports = router;
