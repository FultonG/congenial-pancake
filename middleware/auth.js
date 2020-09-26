const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).send({ msg: "Invalid token" });
      }
      req.user = user;
      return next();
    });
  } else {
    return res.status(400).send({ msg: "No token passed" });
  }
};

module.exports = { authJWT };
