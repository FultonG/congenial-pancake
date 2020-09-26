require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//const apiRoutes = require("./routes/api");
const PORT = process.env.PORT || 3001;
const db = require("./db/db");
const User = require("./models/user");
const user = require("./models/user");
const app = express();

process.env.NODE_ENV === "production"
  ? app.use(express.static("client/build"))
  : null;

db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use("/api", apiRoutes);

app.get("/test", (req, res) => {
  User.find({ license_tag: "12L7HI" }, (err, user) => {
    if (err) {
      return res.send({ err: "Error" });
    }
    return res.send({ msg: user });
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}!`);
});
