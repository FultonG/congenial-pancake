const router = require("express").Router();
const Vendor = require("../models/vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const vendor = require("../models/vendor");
const capitalAPI = process.env.CAPITALONE_KEY;
const saltRounds = 10;

router.post("/create", async (req, res) => {
  const {
    username,
    vendorName,
    password,
    merchant_id,
    menu,
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

  await Vendor.create({
    username,
    vendorName,
    password: hash,
    ...merchantData,
  });

  const vendor = await Vendor.findOne({ username }).select({
    _id: 0,
    __v: 0,
    password: 0,
  });
  const token = jwt.sign({ vendor }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ vendor, token });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const vendor = await Vendor.findOne({ username }).select({
    _id: 0,
    __v: 0,
    password: 0,
  });
  if (!vendor) {
    return res.status(400).send({ msg: "Username not found" });
  }

  const hashedPwd = await Vendor.findOne({ username });
  const comparePwd = await bcrypt.compare(password, hashedPwd.password);
  if (!comparePwd) {
    return res.status(400).send({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return res.send({ vendor, token });
});

router.get("/menu/:vendor", async (req, res) => {
  const vendorName = req.params.vendor;

  console.log(vendorName);
  const vendor = await Vendor.findOne({ vendorName }).select({
    _id: 0,
    __v: 0,
  });
  res.send(vendor.menu || { msg: "This vendor does not have a menu" });
});

router.put("/menu/add", async (req, res) => {
  const vendorName = req.body.vendorName;
  const newItem = req.body.newItem;

  let vendor = await Vendor.findOne({ vendorName });
  const menu = { ...vendor.menu, ...newItem };
  await Vendor.updateOne({ vendorName }, { menu });
  vendor = await Vendor.findOne({ vendorName });
  res.send(vendor.menu);
});

module.exports = router;
