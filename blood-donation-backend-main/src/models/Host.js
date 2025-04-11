const mongoose = require("mongoose");
const HostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    organization: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    reason: { type: String, required: true },
    desiredDate: { type: Date, required: true },
    expectedAttendees: { type: String, required: true },
    schedules: [
      {
        date: { type: Date, required: true },
        slots: [
          {
            time: { type: String, required: true },
            donationType: { type: String, required: true },
            capacity: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Host = mongoose.model("Host", HostSchema);
module.exports = Host;
