const router = require("express").Router();
const User = require("../../models/user");
const auth = require("../../middleware/auth");
const axios = require("axios");
const { response } = require("express");
const capitalAPI = process.env.CAPITALONE_KEY;

router.get("/get/:id", auth.authJWT, (req, res) => {
  const id = req.params.id;

  axios
    .get(`http://api.reimaginebanking.com/customers/${id}?key=${capitalAPI}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.status(500).send({ err }));
});

router.put("/update", auth.authJWT, async (req, res) => {
  const customer_id = req.body.customer_id;
  const update = req.body.update;

  await User.updateOne({ customer_id }, update);
  const user = await User.findOne({ customer_id });

  axios
    .put(
      `http://api.reimaginebanking.com/customers/${customer_id}?key=${capitalAPI}`,
      update
    )
    .then((response) => res.send(user))
    .catch((err) => res.status(500).send({ err }));
});

module.exports = router;
