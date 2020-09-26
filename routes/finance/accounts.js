const router = require("express").Router();
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;

router.get("/get/:id", (req, res) => {
  const accountId = req.params.id;

  axios
    .get(
      `http://api.reimaginebanking.com/accounts/${accountId}?key=${capitalAPI}`
    )
    .then((response) => res.send(response.data))
    .catch((err) => res.status(400).send({ err }));
});

module.exports = router;
