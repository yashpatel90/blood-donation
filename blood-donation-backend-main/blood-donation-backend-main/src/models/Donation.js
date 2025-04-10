const mongoose = require("mongoose");

const demoData = {
  address: "Rampura, Dhaka",
  center: "abc",
  donationType: "Whole Blood",
  donationDate: "2025-04-04T18:00:00.000Z",
  schedule: {
    time: "Morning (9:00 AM - 12:00 PM)",
  },
};

const DonationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  center: {
    type: String,
    required: true,
  },
  donationType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  donationDate: {
    type: String,
    required: true,
  },
  schedule: {
    time: {
      type: String,
      required: true,
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Donation = mongoose.model("Donation", DonationSchema);
module.exports = Donation;
