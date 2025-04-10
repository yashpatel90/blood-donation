const centerService = require("../services/centerServices");
const Slot = require("../models/Slot");
const getCenters = async (req, res) => {
  try {
    const params = req.query || {};
    const centers = await centerService.getCenters(params);
    res.send({
      message: "Centers fetched successfully",
      success: true,
      data: centers,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};
const getCentersWithSlots = async (req, res) => {
  try {
    const params = req.query || {};
    const centers = await centerService.getCenters(params);
    const slots = await Slot.find();
    res.send({
      message: "Centers fetched successfully",
      success: true,
      data: centers,
      slots: slots
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

const createCenter = async (req, res) => {
  try {
    const center = await centerService.createCenter(req.body);
    res.send({
      message: "Center created successfully",
      success: true,
      data: center,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

const updateCenter = async (req, res) => {
  try {
    const center = await centerService.updateCenter(req.params.id, req.body);
    res.send({
      message: "Center updated successfully",
      success: true,
      data: center,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const center = await centerService.deleteCenter(req.params.id);
    res.send({
      message: "Center deleted successfully",
      success: true,
      data: center,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false });
  }
}

module.exports = { getCenters, createCenter, updateCenter, deleteCenter,getCentersWithSlots };
