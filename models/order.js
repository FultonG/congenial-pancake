const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  vendorName: { type: String, required: true },
  licenseTag: { type: String, required: true },
  status: { type: String, required: true },
  order: { type: Object, required: true },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema, "Orders"));
