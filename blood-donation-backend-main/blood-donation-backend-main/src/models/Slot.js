const slotData = [
  {
    date: "2025-03-29T00:00:00+06:00",
    slot: [
      {
        id: "aafad21c-da0a-40d9-93b2-f1d9baecdaac",
        time: "Morning (08:30 AM - 10:00 AM)",
        totalSeats: 1,
        seatLeft: 1,
      },
      {
        id: "1a2b0945-b07f-4c76-ae18-9c8bfdfaac72",
        time: "Morning (10:30 PM - 12:00 PM)",
        totalSeats: 1,
        seatLeft: 1,
      },
      {
        id: "d5a85136-4a2e-417a-825c-407665300fd6",
        time: "Afternoon (01:00 PM - 02:30 PM)",
        totalSeats: 1,
        seatLeft: 1,
      },
      {
        id: "48ef9095-b7b8-4322-a878-9c8067fc9499",
        time: "Afternoon (03:00 PM - 04:30 PM)",
        totalSeats: 1,
        seatLeft: 1,
      },
      {
        id: "e7bb8b16-5366-4052-91b5-9d942ecc6dd6",
        time: "Evening (05:00 PM - 06:30 PM)",
        totalSeats: 1,
        seatLeft: 1,
      },
      {
        id: "0ed11787-48cd-4551-924a-c6b98048980d",
        time: "Evening (07:00 PM - 08:30 PM)",
        totalSeats: 1,
        seatLeft: 1,
      },
    ],
  },
];

const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: [
    {
      id: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      totalSeats: {
        type: Number,
        required: true,
      },
      seatLeft: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;