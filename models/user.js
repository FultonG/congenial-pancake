const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  customer_id: { type: String, required: false },
  account_id: { type: String, required: false },
  balance: { type: Number, required: false },
  address: {
    street_number: { type: String, required: true },
    street_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
});

const User = (module.exports = mongoose.model("User", UserSchema, "Users"));
