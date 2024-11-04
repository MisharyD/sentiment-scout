const Agenda = require("agenda");

const sendMail = require("../middleware/mailer");
const User = require("../models/user");
const Notification = require("../models/notification");
const HttpError = require("../models/http-error");

// Connect Agenda to your MongoDB
const agenda = new Agenda({
  db: {
    address:
      "mongodb+srv://Tsugair27:10qpalzmTTDB@cluster0.djdmo.mongodb.net/SentimentScout?retryWrites=true&w=majority&appName=Cluster0",
  },
});
// Define the job for sending scheduled notifications
agenda.define("send scheduled notification", async (job) => {
  const { userId, platform } = job.attrs.data;

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
