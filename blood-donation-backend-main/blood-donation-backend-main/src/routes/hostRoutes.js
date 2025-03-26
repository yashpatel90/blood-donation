const express = require("express");
const {
  saveHostDrive,
  getHostDrive,
  approveHostDrive,
  deleteHostDrive,
  pendingHostDrive,
  getMyHostDrive,
  getAllHostDrive,
} = require("../controllers/hostController");
const { verifyToken, authorizeAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/create", verifyToken, saveHostDrive);
router.get("/", verifyToken, getAllHostDrive);
router.get("/all", verifyToken, getHostDrive);
router.get("/my-host", verifyToken, getMyHostDrive);
router.put("/approve/:id", verifyToken, authorizeAdmin, approveHostDrive);
router.delete("/delete/:id", verifyToken, authorizeAdmin, deleteHostDrive);
router.get("/pending", verifyToken, authorizeAdmin, pendingHostDrive);

module.exports = router;
