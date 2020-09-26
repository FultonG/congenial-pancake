const router = require("express").Router();
const Vendor = require("../../models/vendor");
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;

router.post("/create", async (req, res) => {
  let { user, username, password, ...payload } = req.body.merchant;

  if (payload._id) {
    return res
      .status(400)
      .send({ msg: "Merchant already created for this account" });
  }

  let merchantData = null;
  await axios
    .post(
      `http://api.reimaginebanking.com/merchants?key=${capitalAPI}`,
      payload
    )
    .then((response) => {
      const { _id, ...data } = response.data.objectCreated;
      merchantData = { ...data, merchant_id: _id };
    })
    .catch((err) => res.status(500).send({ err }));

  console.log(merchantData);

  await Vendor.updateOne({ username }, merchantData);
  user = await Vendor.findOne({ username });

  res.send(user);
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;

  axios
    .get(`http://api.reimaginebanking.com/merchants/${id}?key=${capitalAPI}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.status(500).send({ err }));
});

module.exports = router;
