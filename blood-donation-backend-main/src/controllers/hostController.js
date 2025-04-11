const hostService = require("../services/hostServices");
const saveHostDrive = async (req, res) => {
  try {
    const hostDrive = await hostService.saveHostDrive(req.body, req.user);
    console.log(req.user);
    res.status(200).send({
      message: "Host Drive saved successfully. Awaiting for approval.",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};
const getHostDrive = async (req, res) => {
  try {
    const params = req.query;
    const hostDrive = await hostService.getHostDrive(params);
    res.send({
      message: "Host Drive fetched successfully",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};
const getAllHostDrive = async (req, res) => {
  try {
    const hostDrive = await hostService.getAllHostDrive();
    res.send({
      message: "Host Drive fetched successfully",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
}
const getMyHostDrive = async (req, res) => {
  try {
    const hostDrive = await hostService.getMyHostDrive(req.user);
    res.send({
      message: "Host Drive fetched successfully",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, success: false });
  }
};

const pendingHostDrive = async (req, res) => {
  try {
    const hostDrive = await hostService.pendingHostDrive();
    res.send({
      message: "Pending Host Drive fetched successfully",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

const approveHostDrive = async (req, res) => {
  try {
    const hostDrive = await hostService.approveHostDrive(req.params.id);
    res.send({
      message: "Host Drive approved successfully",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

const deleteHostDrive = async (req, res) => {
  try {
    const hostDrive = await hostService.deleteHostDrive(req.params.id);
    res.send({
      message: "Host Drive deleted successfully",
      success: true,
      data: hostDrive,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

module.exports = {
  saveHostDrive,
  getHostDrive,
  approveHostDrive,
  deleteHostDrive,
  pendingHostDrive,
  getMyHostDrive,
  getAllHostDrive
};
