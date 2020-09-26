const router = require("express").Router();
const User = require("../models/user");

router.get("/get/:tag", (req, res) => {
  const tag = req.params.tag;

  User.findOne({ licenseTag: tag }, (err, user) => {
    if (err) {
      return res.send({ err });
    }
    return res.send(user);
  });
});

router.post("/create", (req, res) => {
  const vendorName = req.body.vendorName;
  const licenseTag = req.body.licenseTag;

  User.find({ vendorName, licenseTag }, (err, user) => {
    if (err) {
      return res.send({ err });
    }
    if (!user.length) {
      User.create(
        { vendorName, licenseTag, completed: false },
        (err, create) => {
          if (err) {
            return res.send({ err });
          }
          return res.send(create);
        }
      );
    } else {
      res.send({ msg: "User already exists" });
    }
  });
});

router.put("/complete/:tag/:vendor", (req, res) => {
  const licenseTag = req.params.tag;
  const vendorName = req.params.vendor;

  User.updateOne(
    { vendorName, licenseTag },
    { completed: true },
    (err, update) => {
      if (err) {
        res.send({ err });
      }
      User.findOne({ licenseTag }, (err, user) => {
        if (err) {
          res.send({ err });
        }
        res.send(user);
      });
    }
  );
});

module.exports = router;
