const mongoose = require("mongoose");

const CenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Center = mongoose.model("Center", CenterSchema);
module.exports = Center;