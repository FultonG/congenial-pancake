const router = require("express").Router();
const merchants = require("./merchants");
const customers = require("./customer");
const purchases = require("./purchases");
const accounts = require("./accounts");

router.use("/merchant", merchants);
router.use("/customer", customers);
router.use("/purchase", purchases);
router.use("/account", accounts);

module.exports = router;
