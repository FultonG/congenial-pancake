const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema({
  username: { type: String, required: true },
  vendorName: { type: String, required: true },
  password: { type: String, required: true },
  merchant_id: { type: String, required: false },
  name: { type: String, required: true },
  creation_date: { type: String, required: false },
});

const Vendor = (module.exports = mongoose.model(
  "Vendor",
  VendorSchema,
  "Vendors"
));
