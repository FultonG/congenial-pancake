const router = require("express").Router();
const Order = require("../models/order");
const auth = require("../middleware/auth");
const vendor = require("../models/vendor");

router.get("/all", auth.authJWT, async (req, res) => {
  const status = req.query.status || null;
  const vendorName = req.query.vendor || null;

  const orders = await Order.find({ vendor }).select({
    __v: 0,
  });
  if (status) {
    const statusOrders = orders.filter(
      (order) => order.status.toLowerCase() == status.toLowerCase()
    );
    return res.send(statusOrders);
  }
  return res.send(orders);
});

router.get("/get/:tag/:vendor", auth.authJWT, async (req, res) => {
  const licenseTag = req.params.tag;
  const vendorName = req.params.vendor;

  const order = await Order.findOne({ vendorName, licenseTag }).select({
    __v: 0,
  });
  return res.send(order);
});

router.post("/create", auth.authJWT, async (req, res) => {
  const vendorName = req.body.vendorName;
  const licenseTag = req.body.licenseTag;
  const ordered = req.body.order;

  console.log(ordered);
  const { _id } = await Order.create({
    vendorName,
    licenseTag,
    status: "ordered",
    order: ordered,
    created: Date.now(),
  });
  const order = await Order.findOne({ _id }).select({
    __v: 0,
  });
  res.send(order);
});

router.put("/status", auth.authJWT, async (req, res) => {
  const licenseTag = req.body.licenseTag;
  const vendorName = req.body.vendorName;
  const status = req.body.status;

  await Order.updateOne({ licenseTag, vendorName }, { status });
  const order = await Order.findOne({ licenseTag, vendorName }).select({
    __v: 0,
  });

  res.send(order);
});

router.delete("/delete", auth.authJWT, async (req, res) => {
  const licenseTag = req.body.licenseTag;
  const vendorName = req.body.vendorName;

  await Order.deleteOne({ vendorName, licenseTag });
  return res.send({ msg: "Order deleted" });
});

module.exports = router;
