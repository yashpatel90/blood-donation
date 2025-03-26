const Donation = require("../models/Donation");
const Host = require("../models/Host");
const Slot = require("../models/Slot");

const saveDonationRecord = async (user, donationData) => {
  console.log(donationData, user);
  const session = await Slot.startSession();

  try {
    session.startTransaction();

    const updatedData = {
      user: user?.id,
      ...donationData,
    };

    const { schedule } = donationData; // Extract schedule ID from donationData

    // Find the slot that contains the given schedule ID
    const slotDocument = await Slot.findOne({ "slot.id": schedule.id }).session(
      session
    );

    if (!slotDocument) {
      throw new Error("Slot not found.");
    }

    // Find the specific slot inside the array
    const slotIndex = slotDocument.slot.findIndex((s) => s.id === schedule.id);

    if (slotIndex === -1) {
      throw new Error("Slot ID not found in the document.");
    }

    // Check if there are available seats
    if (slotDocument.slot[slotIndex].seatLeft <= 0) {
      throw new Error("No available seats for this slot.");
    }

    // Decrease the seatLeft count by 1
    slotDocument.slot[slotIndex].seatLeft -= 1;

    // Save the updated slot document
    await slotDocument.save({ session });

    // Create the donation record
    const donation = await Donation.create([updatedData], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return donation;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    throw new Error(error.message);
  }
};

const getAllDonations = async () => {
  try {
    const donations = await Donation.find().populate("user");
    return donations;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserDonations = async (id) => {
  try {
    const donations = await Donation.find({ user: id });
    return donations;
  } catch (error) {
    throw new Error(error.message);
  }
};

const approveDonation = async (id) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
    return donation;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveDonationRecord,
  getAllDonations,
  getUserDonations,
  approveDonation,
};
