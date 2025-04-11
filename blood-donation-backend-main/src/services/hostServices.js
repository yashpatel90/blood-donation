const Host = require("../models/Host");

const saveHostDrive = async (data, user) => {
  try {
    console.log("user",user)
    const hostDrive = await Host.create({ user: user.id, ...data });
    return hostDrive;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getAllHostDrive = async () => {
  try {
    const hostDrive = await Host.find();
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getHostDrive = async (params) => {
  try {
    const hostDrive = await Host.find({
      zip: params.zip,
      isVerified: true,
      desiredDate: { $gte: new Date() },
    });
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMyHostDrive = async (user) => {
  try {
    const hostDrive = await Host.find({
      user: user.id,
      isVerified: true,
    });
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const pendingHostDrive = async () => {
  try {
    const hostDrive = await Host.find({
      isVerified: false,
    });
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getApprovedHostDrive = async () => {
  try {
    const hostDrive = await Host.find({
      isVerified: true,
    }).populate("user", "firstName email");
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const approveHostDrive = async (id) => {
  try {
    const hostDrive = await Host.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteHostDrive = async (id) => {
  try {
    const hostDrive = await Host.findByIdAndDelete(id);
    return hostDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveHostDrive,
  getHostDrive,
  approveHostDrive,
  deleteHostDrive,
  pendingHostDrive,
  getMyHostDrive,
  getAllHostDrive,
  getApprovedHostDrive
};
