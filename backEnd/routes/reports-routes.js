const express = require("express");
const { check } = require("express-validator");

const sseUtility = require("../middleware/SSE-Utility");
const reportsController = require("../controllers/reports-controllers");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// // Get report details
// router.get(":platform/:rid", getReport);

// // Delete Report
// router.delete;
// (":platform/:rid");

// Generate report now routes
router.get(
  "/generateNow/youtube/:uid/:platform",
  sseUtility,
  reportsController.generateNowYoutube
);

router.get(
  "/generateNow/googlemaps/:uid/:platform",
  sseUtility,
  reportsController.generateNowGoogleMaps
);

router.get(
  "/generateNow/tiktok/:uid/:platform",
  sseUtility,
  reportsController.generateNowTikTok
);

// Generate scheduled reports routes
router.post(
  "/generateScheduled/youtube",
  reportsController.generateScheduledYoutube
);

router.post(
  "/generateScheduled/googlemaps",
  reportsController.generateScheduledGoogleMaps
);
router.post(
  "/generateScheduled/tiktok",
  reportsController.generateScheduledTikTok
);

module.exports = router;
