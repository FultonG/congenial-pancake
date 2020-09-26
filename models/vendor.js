const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  merchant_id: { type: String, required: false },
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: {
    street_number: { type: String, required: true },
    street_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  geocode: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Vendor = (module.exports = mongoose.model(
  "Vendor",
  VendorSchema,
  "Vendors"
));
