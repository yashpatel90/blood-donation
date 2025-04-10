const express = require("express");
const router = express.Router();
const { verifyToken, authorizeAdmin } = require("../middlewares/auth");
const { saveDonationRecord,getAllDonations,getUserDonations,approveDonation } = require("../controllers/donationController");

router.put("/create", verifyToken, saveDonationRecord);
router.get("/all", verifyToken, getAllDonations);
router.get("/user", verifyToken, getUserDonations);
router.put("/approve/:id", verifyToken, authorizeAdmin, approveDonation);

module.exports = router;