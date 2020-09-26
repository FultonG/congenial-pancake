const router = require("express").Router();
const merchants = require("./merchants");
const customer = require("./customer");

router.use("/merchant", merchants);
router.use("/customer", customer);

module.exports = router;
