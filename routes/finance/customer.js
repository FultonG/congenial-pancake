const router = require("express").Router();
const User = require("../../models/user");
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;

router.post("/create", async (req, res) => {
  let user = req.body.customer;
  const username = user.username;
  const payload = user.customerData;

  if (payload._id) {
    return res
      .status(400)
      .send({ msg: "Customer already created for this account" });
  }

  let customerData = null;
  await axios
    .post(
      `http://api.reimaginebanking.com/customers?key=${capitalAPI}`,
      payload
    )
    .then((response) => (customerData = response.data.objectCreated))
    .catch((err) => res.status(500).send({ err }));

  await User.updateOne({ username }, { customerData });
  user = await User.findOne({ username });

  res.send(user);
});

router.get("/get/:id", (req, res) => {
  const id = req.params.id;

  axios
    .get(`http://api.reimaginebanking.com/customers/${id}?key=${capitalAPI}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.status(500).send({ err }));
});

module.exports = router;
