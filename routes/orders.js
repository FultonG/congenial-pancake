const router = require("express").Router();
const Order = require("../models/order");
const auth = require("../middleware/auth");

router.get("/get", auth.authJWT, (req, res) => {
  const completed = Boolean(req.query.completed) || null;
  const filter = completed ? { completed } : null;

  Order.find(filter, (err, orders) => {
    if (err) {
      return res.status(500).send({ err });
    }
    return res.send(orders);
  });
});

router.get("/get/:tag/:vendor", auth.authJWT, (req, res) => {
  const licenseTag = req.params.tag;
  const vendorName = req.params.vendor;

  Order.findOne({ vendorName, licenseTag }, (err, order) => {
    if (err) {
      return res.status(500).send({ err });
    }
    return res.send(order);
  });
});

router.post("/create", auth.authJWT, (req, res) => {
  const vendorName = req.body.vendorName;
  const licenseTag = req.body.licenseTag;

  Order.find({ vendorName, licenseTag }, (err, order) => {
    if (err) {
      return res.status(500).send({ err });
    }
    if (!order.length) {
      Order.create(
        { vendorName, licenseTag, completed: false },
        (err, create) => {
          if (err) {
            return res.status(500).send({ err });
          }
          return res.send(create);
        }
      );
    } else {
      return rres.send({ msg: "User already exists" });
    }
  });
});

router.put("/complete/:tag/:vendor", auth.authJWT, (req, res) => {
  const licenseTag = req.params.tag;
  const vendorName = req.params.vendor;

  Order.updateOne(
    { vendorName, licenseTag },
    { completed: true },
    (err, update) => {
      if (err) {
        return rres.status(500).send({ err });
      }
      Order.findOne({ licenseTag }, (err, order) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.send(order);
      });
    }
  );
});

router.delete("/delete", auth.authJWT, (req, res) => {
  const licenseTag = req.body.licenseTag;
  const vendorName = req.body.vendorName;

  Order.deleteOne({ vendorName, licenseTag }, (err) => {
    if (err) {
      return res.status(500).send({ err });
    }
    return res.send({ msg: "User deleted" });
  });
});

module.exports = router;
