const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/passwordHash");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    healthInformation: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    bloodType: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await comparePassword(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
