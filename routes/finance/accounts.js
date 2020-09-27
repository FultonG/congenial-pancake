const router = require("express").Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;

router.get("/get/:id", auth.authJWT, (req, res) => {
  const accountId = req.params.id;

  axios
    .get(
      `http://api.reimaginebanking.com/accounts/${accountId}?key=${capitalAPI}`
    )
    .then((response) => res.send(response.data))
    .catch((err) => res.status(400).send({ err }));
});

module.exports = router;
