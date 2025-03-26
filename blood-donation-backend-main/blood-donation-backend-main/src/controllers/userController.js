const userService = require("../services/userServices");
const donationService = require("../services/donationServices");
const hostService = require("../services/hostServices");

const getUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

const fetchUserDetails = async (req, res) => {
  try {
    console.log("user", req.user.email);
    const user = await userService.fetchUserDetails(req.user.email);
    const allDonations = await donationService.getUserDonations(user._id);
    const myHosts = await hostService.getMyHostDrive(req.user);
    const allHosts = await hostService.getApprovedHostDrive()

    let donations = [];
    let appointments = [];
    allDonations.forEach((donation) => {
      if (donation.isApproved) {
        donations.push(donation);
      } else {
        appointments.push(donation);
      }
    });

    res.send({
      message: "User fetched successfully",
      success: true,
      data: {
        user: user,
        donations: donations,
        appointments: appointments,
        hosts: myHosts,
        allHosts: allHosts,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.body, req.user);
    res.send({
      message: "User updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

const deleteUser = async(req,res)=>{
  try{
    const user = await userService.deleteUser(req.user);
    res.send({
      message: "User deleted successfully",
      success: true,
      data: user,
    });
  }catch(error){
    return res.status(400).send({ message: error.message, success: false });
  }
}

module.exports = { getUsers, fetchUserDetails, updateUser, deleteUser };
