const Center = require("../models/Center");

const getCenters = async (params) => {
  try {
    const query = { ...params };
    console.log(query)
    const centers = await Center.find(query);
    return centers;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCenter = async (center) => {
  try {
    const newCenter = new Center(center);
    return await newCenter.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCenter = async (centerId, center) => {
  try {
    return await Center.findByIdAndUpdate(centerId, center, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCenter = async (centerId) => {
  try {
    return await Center.findByIdAndDelete(centerId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getCenters, createCenter, updateCenter, deleteCenter };
