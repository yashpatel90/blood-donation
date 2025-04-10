const User = require("../models/User");
const jwtUtils = require("../utils/jwtUtils");
const { comparePassword } = require("../utils/passwordHash");

const register = async (userData) => {
  const userExists = await User.findOne({ email: userData?.email });
  if (userExists) throw new Error("User with this email already exists");
  const user = await User.create(userData);
  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await comparePassword(password, user?.password);
  if (!user || !isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = jwtUtils.generateToken(user);
  return { token, user };
};

module.exports = { register, login };
