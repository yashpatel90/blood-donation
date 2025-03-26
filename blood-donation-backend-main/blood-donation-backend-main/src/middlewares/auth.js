const jwt = require("jsonwebtoken");
const jwt_secret = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      success: false,
      message: "unauthorized access",
    });
  }
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "unauthorized access",
    });
  }
  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access",
      });
    }
    req.user = decoded;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
module.exports = { authorizeAdmin, verifyToken };
