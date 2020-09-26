const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.get("/get", auth.authJWT, (req, res) => {
  const completed = Boolean(req.query.completed) || null;
  const filter = completed ? { completed } : null;

  User.find(filter, (err, users) => {
    if (err) {
      return res.status(500).send({ err });
    }
    return res.send(users);
  });
});

router.get("/get/:tag/:vendor", auth.authJWT, (req, res) => {
  const licenseTag = req.params.tag;
  const vendorName = req.params.vendor;

  User.findOne({ vendorName, licenseTag }, (err, user) => {
    if (err) {
      return res.status(500).send({ err });
    }
    return res.send(user);
  });
});

router.post("/create", (req, res) => {
  const vendorName = req.body.vendorName;
  const licenseTag = req.body.licenseTag;

  User.find({ vendorName, licenseTag }, (err, user) => {
    if (err) {
      return res.status(500).send({ err });
    }
    if (!user.length) {
      User.create(
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

  User.updateOne(
    { vendorName, licenseTag },
    { completed: true },
    (err, update) => {
      if (err) {
        return rres.status(500).send({ err });
      }
      User.findOne({ licenseTag }, (err, user) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.send(user);
      });
    }
  );
});

router.delete("/delete", auth.authJWT, (req, res) => {
  const licenseTag = req.body.licenseTag;
  const vendorName = req.body.vendorName;

  User.deleteOne({ vendorName, licenseTag }, (err) => {
    if (err) {
      return res.status(500).send({ err });
    }
    return res.send({ msg: "User deleted" });
  });
});

module.exports = router;
