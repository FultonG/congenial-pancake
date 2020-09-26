const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema({
  username: { type: String, required: true },
  vendorName: { type: String, required: true },
  password: { type: String, required: true },
});

const Vendor = (module.exports = mongoose.model(
  "Vendor",
  VendorSchema,
  "Vendors"
));
