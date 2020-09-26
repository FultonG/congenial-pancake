var express = require("express");
var ocrRouter = require("./ocr");

var app = express();

app.use("/ocr/", ocrRouter);

module.exports = app;