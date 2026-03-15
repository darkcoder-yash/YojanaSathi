const express = require("express");
const router = express.Router();
const { getGovernmentUpdates } = require("../controllers/updatesController");

router.get("/government-updates", getGovernmentUpdates);

module.exports = router;
