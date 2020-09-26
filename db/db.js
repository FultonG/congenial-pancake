const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

module.exports = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
