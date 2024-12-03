const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Notification = require("../models/notification");
const YouTubeReport = require("../models/youtubeReport");
const GoogleMapsReport = require("../models/googlemapsReport");
const TikTokReport = require("../models/tiktokReport");

const sendMail = require("../middleware/mailer");
const agenda = require("../middleware/agenda");

const {
  getVideoDetails,
  getComments,
  getChannelSubscribers,
  saveReportToDB,
} = require("../middleware/youtube");

const {
  getPlaceDetailsAndReviews,
  saveGoogleMapsReportToDB,
} = require("../middleware/googlemaps");

const {
  getTikTokVideoDetails,
  getTikTokComments,
  saveTikTokReportToDB,
} = require("../middleware/tiktok");

const { getSentiment } = require("../ai-model/model");

// find report
const getReportDetails = async (req, res, next) => {
  const { rid, platform } = req.params;

  let ReportModel;
  switch (platform) {
    case "YouTube":
      ReportModel = YouTubeReport;
      break;
    case "Google Maps":
      ReportModel = GoogleMapsReport;
      break;
    case "TikTok":
      ReportModel = TikTokReport;
      break;
    default:
      return next(new HttpError("Invalid platform specified", 400));
  }

  let report;
  try {
    report = await ReportModel.findById(rid);
    if (!report) {
      return next(new HttpError("Report not found", 404));
    }
  } catch (err) {
    return next(new HttpError("Failed to retrieve the report", 500));
  }

  res.status(200).json({ report });
};

// Delete Report
const deleteReport = async (req, res, next) => {
  const { rid, platform } = req.params;

  let ReportModel;
  switch (platform) {
    case "YouTube":
      ReportModel = YouTubeReport;
      break;
    case "Google Maps":
      ReportModel = GoogleMapsReport;
      break;
    case "TikTok":
      ReportModel = TikTokReport;
      break;
    default:
      return next(new HttpError("Invalid platform specified", 400));
  }

  try {
    const report = await ReportModel.findByIdAndDelete(rid);
    if (!report) {
      return next(new HttpError("Report not found or already deleted", 404));
    }
  } catch (err) {
    return next(new HttpError("Failed to delete the report", 500));
  }

  res.status(200).json({ message: "Report deleted successfully" });
};

// Sleep function to introduce delays ( for SSE )
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateNowYoutube = async (req, res, next) => {
  const { uid: userId, platform } = req.params; // Extract uid and platform from params
  const { url } = req.query; // Extract url from query string

  if (!url) {
    return next(new HttpError("URL is required", 400));
  }

  // Step 1: Validate User
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("User lookup failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }

  // Step 2: Generate YouTube Report
  try {
    // Step 2.1: Fetch video details
    res.sendProgress(25, "Fetching video details...");
    await sleep(1000); // Wait for 1 second
    const videoDetails = await getVideoDetails(url);

    // Step 2.2: Fetch comments
    res.sendProgress(50, "Fetching comments...");
    await sleep(1000); // Wait for 1 second
    const comments = await getComments(videoDetails.videoId);

    // Step 2.3: Analyze sentiments
    res.sendProgress(75, "Analyzing sentiments...");
    await sleep(1000); // Wait for 1 second
    const sentimentSummary = await getSentiment(comments);

    // Step 2.4: Fetch subscriber count
    videoDetails.subscribers = await getChannelSubscribers(
      videoDetails.channelId
    );

    // Step 2.5: Save report to the database
    res.sendProgress(90, "Saving report to database...");
    await sleep(1000); // Wait for 1 second
    const reportId = await saveReportToDB({
      userId,
      videoDetails,
      sentimentSummary,
      url,
    });

    // Finalize progress
    res.sendProgress(100, "Report generation completed!", reportId);
  } catch (err) {
    console.error("Error generating YouTube report:", err.message);
    res.sendError("Failed to generate YouTube report.");
    return next(new HttpError("Failed to generate YouTube report.", 500));
  }

  // Step 3: Send Email Notification
  try {
    await sendMail(
      user.email,
      user.name,
      `Your ${platform} Report is Ready !!`,
      `Hello ${user.name}, your report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
      `<h2>Hello ${user.name}!</h2>
        <h3>Your report has been generated.</h3>
        <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>`
    );
    console.log("server closed SSE");
    res.end(); // Close SSE connection
  } catch (err) {
    const error = new HttpError("Failed to send email", 500);
    return next(error);
  }
};

const generateNowGoogleMaps = async (req, res, next) => {
  const { uid: userId, platform } = req.params; // Extract user ID and platform from params
  const { url } = req.query; // Extract URL from query string

  if (!url) {
    return next(new HttpError("URL is required", 400));
  }

  // Step 1: Validate User
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("User lookup failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }

  // Step 2: Generate Google Maps Report
  try {
    res.sendProgress(25, "Fetching place details and reviews...");
    await sleep(1000); // Simulate delay
    const placeDetails = await getPlaceDetailsAndReviews(url);

    res.sendProgress(75, "Analyzing sentiments...");
    await sleep(1000); // Simulate delay
    const sentimentSummary = await getSentiment(placeDetails.reviews);

    res.sendProgress(90, "Saving report to database...");
    await sleep(1000); // Simulate delay
    const reportId = await saveGoogleMapsReportToDB({
      userId,
      placeDetails,
      sentimentSummary,
    });

    res.sendProgress(100, "Report generation completed!", reportId);
  } catch (err) {
    console.error("Error generating Google Maps report:", err.message);
    res.sendError("Failed to generate Google Maps report.");
    return next(new HttpError("Failed to generate Google Maps report.", 500));
  }

  // Step 3: Send Email Notification
  try {
    await sendMail(
      user.email,
      user.name,
      `Your ${platform} Report is Ready !!`,
      `Hello ${user.name}, your report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
      `<h2>Hello ${user.name}!</h2>
        <h3>Your report has been generated.</h3>
        <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>`
    );
    res.end(); // Close SSE connection
  } catch (err) {
    const error = new HttpError("Failed to send email", 500);
    return next(error);
  }
};

const generateNowTikTok = async (req, res, next) => {
  const { uid: userId, platform } = req.params; // Extract user ID and platform from params
  const { url } = req.query; // Extract URL from query string

  if (!url) {
    return next(new HttpError("URL is required", 400));
  }

  // Step 1: Validate User
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("User lookup failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }

  // Step 2: Generate TikTok Report
  try {
    res.sendProgress(25, "Fetching post details...");
    await sleep(1000); // Simulate delay
    const videoDetails = await getTikTokVideoDetails(url);

    res.sendProgress(50, "Fetching comments...");
    await sleep(1000); // Simulate delay
    const comments = await getTikTokComments(url);

    res.sendProgress(75, "Analyzing sentiments...");
    await sleep(1000); // Simulate delay
    const sentimentSummary = await getSentiment(comments);

    res.sendProgress(90, "Saving report to database...");
    const reportId = await saveTikTokReportToDB({
      userId,
      videoDetails,
      sentimentSummary,
      url,
    });

    res.sendProgress(100, "Report generation completed!", reportId);
  } catch (err) {
    console.error("Error generating TikTok report:", err.message);
    res.sendError("Failed to generate TikTok report.");
    return next(new HttpError("Failed to generate TikTok report.", 500));
  }

  // Step 3: Send Email Notification
  try {
    await sendMail(
      user.email,
      user.name,
      `Your ${platform} Report is Ready !!`,
      `Hello ${user.name}, your report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
      `<h2>Hello ${user.name}!</h2>
        <h3>Your report has been generated.</h3>
        <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>`
    );
    res.end(); // Close SSE connection
  } catch (err) {
    const error = new HttpError("Failed to send email", 500);
    return next(error);
  }
};

const generateScheduledYoutube = async (req, res, next) => {
  const { userId, platform, date, timezone, url } = req.body;

  // Check if URL is provided
  if (!url) {
    console.error("No URL provided");
    return res.status(400).json({ error: "URL is required" });
  }

  // Convert the user's local date-time to UTC
  const scheduledTime = moment.tz(date, timezone).toDate();

  // Check if the provided date is valid and in the future
  if (isNaN(scheduledTime.getTime())) {
    return next(new HttpError("Invalid date format provided", 400));
  }

  if (scheduledTime <= new Date()) {
    return next(new HttpError("Please provide a future date", 400));
  }

  // Schedule the report generation and notification job with Agenda
  await agenda.schedule(scheduledTime, "generate scheduled youtube report", {
    userId,
    platform,
    url,
  });

  res.status(200).json({ message: "Report generation scheduled successfully" });
};

const generateScheduledGoogleMaps = async (req, res, next) => {
  const { userId, platform, date, timezone, url } = req.body;

  // Convert the user's local date-time to UTC
  const scheduledTime = moment.tz(date, timezone).toDate();

  // Check if the provided date is valid and in the future
  if (isNaN(scheduledTime.getTime())) {
    return next(new HttpError("Invalid date format provided", 400));
  }

  if (scheduledTime <= new Date()) {
    return next(new HttpError("Please provide a future date", 400));
  }

  // Schedule the report generation and notification job with Agenda
  await agenda.schedule(scheduledTime, "generate scheduled googlemaps report", {
    userId,
    platform,
    url,
  });

  res
    .status(200)
    .json({ message: "Google Maps report generation scheduled successfully" });
};

const generateScheduledTikTok = async (req, res, next) => {
  const { userId, platform, date, timezone, url } = req.body;

  // Convert the user's local date-time to UTC
  const scheduledTime = moment.tz(date, timezone).toDate();

  // Check if the provided date is valid and in the future
  if (isNaN(scheduledTime.getTime())) {
    return next(new HttpError("Invalid date format provided", 400));
  }

  if (scheduledTime <= new Date()) {
    return next(new HttpError("Please provide a future date", 400));
  }

  // Schedule the report generation and notification job with Agenda
  await agenda.schedule(scheduledTime, "generate scheduled tiktok report", {
    userId,
    platform,
    url,
  });

  res
    .status(200)
    .json({ message: "TikTok report generation scheduled successfully" });
};

exports.generateNowYoutube = generateNowYoutube;
exports.generateNowGoogleMaps = generateNowGoogleMaps;
exports.generateNowTikTok = generateNowTikTok;
exports.generateScheduledYoutube = generateScheduledYoutube;
exports.generateScheduledGoogleMaps = generateScheduledGoogleMaps;
exports.generateScheduledTikTok = generateScheduledTikTok;
exports.getReportDetails = getReportDetails;
exports.deleteReport = deleteReport;
