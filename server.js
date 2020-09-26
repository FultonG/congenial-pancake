require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");

const apiUsers = require("./routes/users");
const vendorLogin = require("./routes/login");
const ocrRoutes = require("./routes/ocr");

const PORT = process.env.PORT || 3001;
const db = require("./db/db");
const app = express();

process.env.NODE_ENV === "production"
  ? app.use(express.static("client/build"))
  : null;

db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

//To allow cross-origin requests
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

app.use("/users", apiUsers);
app.use("/vendors", vendorLogin);
app.use("/ocr", ocrRoutes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}!`);
});