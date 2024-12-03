const Agenda = require("agenda");

const sendMail = require("../middleware/mailer");
const User = require("../models/user");
const Notification = require("../models/notification");
const HttpError = require("../models/http-error");

const { getSentiment } = require("../ai-model/model");

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

// Connect Agenda to MongoDB
const agenda = new Agenda({
  db: {
    address:
      "mongodb+srv://Tsugair27:10qpalzmTTDB@cluster0.djdmo.mongodb.net/SentimentScout?retryWrites=true&w=majority&appName=Cluster0",
  },
});

// Define the job for generating scheduled YouTube reports
agenda.define("generate scheduled youtube report", async (job) => {
  const { userId, platform, url } = job.attrs.data;

  // Fetch user info from the database
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return; // Exit the job if the user is not found
    }
  } catch (err) {
    console.error("User lookup failed:", err.message);
    return; // Log and exit the job if there's an error fetching the user
  }

  // Generate YouTube report
  try {
    console.log("Generating scheduled YouTube report...");

    // Step 1: Fetch video details
    const videoDetails = await getVideoDetails(url);

    // Step 2: Fetch comments
    const comments = await getComments(videoDetails.videoId);

    // Step 3: Analyze sentiments
    const sentimentSummary = await getSentiment(comments);

    // Step 4: Fetch subscriber count
    videoDetails.subscribers = await getChannelSubscribers(
      videoDetails.channelId
    );

    // Step 5: Save report to database
    await saveReportToDB({
      userId,
      videoDetails,
      sentimentSummary,
      url,
    });

    console.log("Scheduled YouTube report generated successfully.");
  } catch (err) {
    console.error("Error generating scheduled YouTube report:", err.message);
    return; // Exit if there's an error during report generation
  }

  // Send email notification
  try {
    await sendMail(
      user.email,
      user.name,
      `Your ${platform} Scheduled Report is Ready !!`,
      `Hello ${user.name}, your scheduled report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
      `<h2>Hello ${user.name}!</h2>
      <h3>Your scheduled report has been generated.</h3>
      <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>
      `
    );
  } catch (err) {
    console.error("Error sending email notification:", err.message);
    return; // Log and exit if there's an error sending the email
  }

  // Create an in-website notification
  try {
    const notification = new Notification({
      userId: userId,
      message: `Your scheduled report for ${platform} is ready !!`,
      createdAt: new Date(),
      isRead: false,
    });
    await notification.save();
  } catch (err) {
    console.error("Error creating in-website notification:", err.message);
    return; // Log and exit if there's an error saving the notification
  }
});

// Define a job for Google Maps scheduled reports
agenda.define("generate scheduled googlemaps report", async (job) => {
  const { userId, platform, url } = job.attrs.data;

  // Fetch user info from the database
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }
  } catch (err) {
    console.error("User lookup failed:", err.message);
    return;
  }

  // Generate Google Maps report
  try {
    console.log("Generating scheduled Google Maps report...");

    // Fetch place details and reviews
    const placeDetails = await getPlaceDetailsAndReviews(url);

    // Analyze sentiments
    const sentimentSummary = await getSentiment(placeDetails.reviews);

    // Save report to database
    await saveGoogleMapsReportToDB({
      userId,
      placeDetails,
      sentimentSummary,
    });

    console.log("Scheduled Google Maps report generated successfully.");
  } catch (err) {
    console.error(
      "Error generating scheduled Google Maps report:",
      err.message
    );
    return;
  }

  // Send email notification
  try {
    await sendMail(
      user.email,
      user.name,
      `Your ${platform} Scheduled Report is Ready !!`,
      `Hello ${user.name}, your scheduled report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
      `<h2>Hello ${user.name}!</h2>
      <h3>Your scheduled report has been generated.</h3>
      <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>`
    );
  } catch (err) {
    console.error("Error sending email notification:", err.message);
    return;
  }

  // Create in-website notification
  try {
    const notification = new Notification({
      userId: userId,
      message: `Your scheduled report for ${platform} is ready !!`,
      createdAt: new Date(),
      isRead: false,
    });
    await notification.save();
  } catch (err) {
    console.error("Error creating in-website notification:", err.message);
  }
});

// Define a job for TikTok scheduled reports
agenda.define("generate scheduled tiktok report", async (job) => {
  const { userId, platform, url } = job.attrs.data;

  // Fetch user info from the database
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }
  } catch (err) {
    console.error("User lookup failed:", err.message);
    return;
  }

  // Generate TikTok report
  try {
    console.log("Generating scheduled TikTok report...");

    // Fetch video details
    const videoDetails = await getTikTokVideoDetails(url);

    // Fetch comments
    const comments = await getTikTokComments(url);

    // Analyze sentiments
    const sentimentSummary = await getSentiment(comments);

    // Save report to database
    await saveTikTokReportToDB({
      userId,
      videoDetails,
      sentimentSummary,
      url,
    });

    console.log("Scheduled TikTok report generated successfully.");
  } catch (err) {
    console.error("Error generating scheduled TikTok report:", err.message);
    return;
  }

  // Send email notification
  try {
    await sendMail(
      user.email,
      user.name,
      `Your ${platform} Scheduled Report is Ready !!`,
      `Hello ${user.name}, your scheduled report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
      `<h2>Hello ${user.name}!</h2>
      <h3>Your scheduled report has been generated.</h3>
      <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>`
    );
  } catch (err) {
    console.error("Error sending email notification:", err.message);
    return;
  }

  // Create in-website notification
  try {
    const notification = new Notification({
      userId: userId,
      message: `Your scheduled report for ${platform} is ready !!`,
      createdAt: new Date(),
      isRead: false,
    });
    await notification.save();
  } catch (err) {
    console.error("Error creating in-website notification:", err.message);
  }
});

// Define the job for cleaning up all completed jobs except itself
agenda.define("cleanup old jobs", async () => {
  try {
    const result = await agenda._collection.deleteMany({
      lastFinishedAt: { $exists: true },
      name: { $ne: "cleanup old jobs" }, // Exclude the cleanup job itself
    });
    console.log(`Completed jobs removed: ${result.deletedCount}`);
  } catch (error) {
    console.error("Error cleaning up completed jobs:", error);
  }
});

// Define a weekly job to delete read notifications older than one week
agenda.define("delete read notifications", async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate the date one week ago

  try {
    const result = await Notification.deleteMany({
      isRead: true,
      createdAt: { $lt: oneWeekAgo },
    });
    console.log(
      `Deleted ${result.deletedCount} read notifications older than one week`
    );
  } catch (err) {
    console.error("Error deleting read notifications:", err.message);
  }
});

// Schedule the cleanup jobs
agenda.on("ready", async () => {
  // Schedule the cleanup job to run every 30 minutes
  await agenda.every("*/30 * * * *", "cleanup old jobs");

  // Schedule the read notifications deletion job to run weekly on Sunday at midnight
  await agenda.every("0 0 * * 0", "delete read notifications"); // Runs every Sunday at midnight
  console.log(
    "Scheduled weekly job to delete read notifications older than one week"
  );
});
module.exports = agenda;
