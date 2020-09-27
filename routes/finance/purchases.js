const router = require("express").Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;
const Order = require("../../models/order");

router.post("/create", auth.authJWT, async (req, res) => {
  const account_id = req.body.account_id;
  const merchant_id = req.body.merchant_id;
  const vendorName = req.body.vendorName;
  const licenseTag = req.body.licenseTag;
  const ordered = req.body.order;
  const amount = req.body.amount;

  const date = new Date();
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const purchase_date = `${year}-${month}-${day}`;

  let purchase = null;
  const payload = { merchant_id, amount, purchase_date, medium: "balance" };
  await axios
    .post(
      `http://api.reimaginebanking.com/accounts/${account_id}/purchases?key=${capitalAPI}`,
      payload
    )
    .then((response) => (purchase = response.data.objectCreated))
    .catch((err) => res.status(400).send({ err }));

  const { _id } = await Order.create({
    vendorName,
    licenseTag,
    status: "Ordered",
    order: ordered,
    created: Date.now(),
  });
  const order = await Order.findOne({ _id }).select({
    __v: 0,
  });

  res.send({ order, purchase });
});

router.get("/get/:id", auth.authJWT, (req, res) => {
  const accountId = req.params.id;
  const vendor = Boolean(req.query.vendor) || null;

  if (vendor) {
    const merchantId = req.query.vendor;
    axios
      .get(
        `http://api.reimaginebanking.com/merchants/${merchantId}/accounts/${accountId}/purchases?key=${capitalAPI}`
      )
      .then((response) => res.send(response.data))
      .catch((err) => res.status(400).send({ err }));
  } else {
    axios
      .get(
        `http://api.reimaginebanking.com/accounts/${accountId}/purchases?key=${capitalAPI}`
      )
      .then((response) => res.send(response.data))
      .catch((err) => res.status(400).send({ err }));
  }
});

module.exports = router;
