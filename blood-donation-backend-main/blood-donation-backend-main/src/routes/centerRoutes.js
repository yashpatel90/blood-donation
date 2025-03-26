const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const {
  getCenters,
  createCenter,
  updateCenter,
  deleteCenter,
  getCentersWithSlots,
} = require("../controllers/centerController");
const router = express.Router();

router.get("/", verifyToken, getCenters);
router.get("/slots", verifyToken, getCentersWithSlots);
router.post("/create", verifyToken, createCenter);
router.put("/update/:id", verifyToken, updateCenter);
router.delete("/delete/:id", verifyToken, deleteCenter);

module.exports = router;
