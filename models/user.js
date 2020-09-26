const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  vendorName: { type: String, required: true },
  licenseTag: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const User = (module.exports = mongoose.model("User", UserSchema, "Users"));
