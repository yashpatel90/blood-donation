const donationService = require("../services/donationServices");

const saveDonationRecord = async (req, res) => {
  try {
    const donationRecord = await donationService.saveDonationRecord(
      req.user,
      req.body
    );
    const user = {
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
    }
    console.log("cc",user)
    res.status(200).send({
      message: "Donation appointment saved successfully.",
      success: true,
      data: donationRecord,
      user
    });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await donationService.getAllDonations();
    res.status(200).send({
      message: "All donations fetched successfully.",
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const getUserDonations = async (req, res) => {
  try {
    const donations = await donationService.getUserDonations(req.user.id);
    res.status(200).send({
      message: "User donations fetched successfully.",
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const approveDonation = async(req,res)=>{
  try{
    const donation = await donationService.approveDonation(req.params.id);
    res.status(200).send({
      message: "Donation approved successfully.",
      success: true,
      data: donation,
    });
  }catch(error){
    res.status(400).send({ message: error.message, success: false });
  }
}

module.exports = { saveDonationRecord,getAllDonations,getUserDonations,approveDonation };
