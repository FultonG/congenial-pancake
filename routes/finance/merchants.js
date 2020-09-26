const router = require("express").Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const capitalAPI = process.env.CAPITALONE_KEY;

router.get("/get/:id", auth.authJWT, async (req, res) => {
  const id = req.params.id;

  axios
    .get(`http://api.reimaginebanking.com/merchants/${id}?key=${capitalAPI}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.status(500).send({ err }));
});

module.exports = router;
