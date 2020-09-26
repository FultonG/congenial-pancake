const mongoose = require("mongoose");

const DetailSchema = mongoose.Schema({
  something: {}
}, { strict: false });

const OrderSchema = mongoose.Schema({
  vendorName: { type: String, required: true },
  details: { type: DetailSchema, required: false },
  licenseTag: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema, "Orders"));
