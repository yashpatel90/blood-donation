const express = require("express");
const { verifyToken, authorizeAdmin } = require("../middlewares/auth");
const {
  getUsers,
  fetchUserDetails,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/all", verifyToken, authorizeAdmin, getUsers);
router.get("/", verifyToken, fetchUserDetails);
router.put("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;
