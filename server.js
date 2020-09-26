require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const apiUsers = require("./routes/users");
const PORT = process.env.PORT || 3001;
const db = require("./db/db");
const app = express();

process.env.NODE_ENV === "production"
  ? app.use(express.static("client/build"))
  : null;

db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", apiUsers);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}!`);
});
