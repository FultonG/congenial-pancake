const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  vendor_name: { type: String, required: true },
  license_tag: { type: String, required: true },
});

const User = (module.exports = mongoose.model("User", UserSchema, "Users"));
