const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  customerData: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: {
      street_number: { type: String, required: true },
      street_name: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    _id: { type: String, required: false },
  },
});

const User = (module.exports = mongoose.model("User", UserSchema, "Users"));
