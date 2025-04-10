const User = require("../models/User");

const fetchUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchUserDetails = async (email) => {
  try {
    const user = await User.findOne({ email });
    console.log(user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (data, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(user.id, data, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async ( user) => {
  try {
    const deletedUser = await User.findByIdAndDelete(user.id);
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { fetchUsers, fetchUserDetails, updateUser, deleteUser };
