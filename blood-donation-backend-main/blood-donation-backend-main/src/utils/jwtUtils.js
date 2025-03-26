const jwt = require("jsonwebtoken");
const jwt_secret = process.env.TOKEN_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    { id: user?._id, email: user?.email, role: user?.role, name: user?.firstName, phone: user?.phoneNumber },
    jwt_secret,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = { generateToken };
