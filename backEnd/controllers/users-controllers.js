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

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  // Check if user already exists
  if (existingUser) {
    const error = new HttpError("User exists already.", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date,
  });

  try {
    await createdUser.save();

    // Send welcome email to the user
    await sendMail(
      email,
      name,
      "Welcome to Sentiment Scout!",
      `Hi ${name}, welcome to our platform!. We're excited to have you on board. We are waiting for your first report !!`,
      `<h2>Hi ${name},</h2><p>Welcome to our platform! We're excited to have you on board. We are waiting for your first report !!</p>`
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  // Generating a token for the user
  let token;
  try {
    token = jwt.sign({ userId: createdUser.id }, "supersecret_dont_share", {
      expiresIn: "1h",
    });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  // Normalize the email by converting it to lowercase
  const normalizedEmail = email.toLowerCase();
  try {
    existingUser = await User.findOne({ email: normalizedEmail });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  // Generating a token for the user
  let token;
  try {
    token = jwt.sign({ userId: existingUser.id }, "supersecret_dont_share", {
      expiresIn: "1h",
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const userInfo = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    // Fetch user details
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided ID.",
      404
    );
    return next(error);
  }

  let reportCount = 0;
  let scheduledReportsCount = 0;

  try {
    // Count reports across all platforms
    const youtubeReportsCount = await YouTubeReport.countDocuments({
      userId: uid,
    });
    const googleMapsReportsCount = await GoogleMapsReport.countDocuments({
      userId: uid,
    });
    const tiktokReportsCount = await TikTokReport.countDocuments({
      userId: uid,
    });

    reportCount =
      youtubeReportsCount + googleMapsReportsCount + tiktokReportsCount;

    // Count scheduled jobs in Agenda
    const jobs = await agenda.jobs({ "data.userId": uid });
    scheduledReportsCount = jobs.length;
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not fetch report data.",
      500
    );
    return next(error);
  }

  res.json({
    name: user.name,
    email: user.email,
    reportCount,
    scheduledReportsCount,
  });
};

const updateUserInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, userId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Updating failed, please try again later.",
      500
    );
    return next(error);
  }

  // Check if user's email already exists
  if (existingUser && existingUser.id !== userId) {
    const error = new HttpError("Email exists already.", 422);
    return next(error);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Updating failed, please try again later.",
      500
    );
    return next(error);
  }

  user.name = name;
  user.email = email;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Updating failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "User info updated successfully!",
    name: user.name,
    email: user.email,
  });
};

const updatePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { oldPassword, newPassword, userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  } catch (err) {
    const error = new HttpError(
      "Could not verify password, please try again.",
      500
    );
    return next(error);
  }

  // Check if the old password is correct
  if (!isPasswordValid) {
    return next(new HttpError("Old password is incorrect.", 401));
  }

  // Hash the new password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds
  } catch (err) {
    return next(
      new HttpError("Could not update password, please try again.", 500)
    );
  }

  user.password = hashedPassword;

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError("Saving new password failed, please try again later.", 500)
    );
  }

  res.status(200).json({
    message: "Password updated successfully!",
    name: user.name,
    email: user.email,
  });
};

const getNotifications = async (req, res, next) => {
  const userId = req.params.uid;

  let notifications;
  try {
    // Find all notifications for the specified userId
    notifications = await Notification.find({ userId: userId }).sort({
      createdAt: -1,
    }); // Sorting by date, newest first
  } catch (err) {
    const error = new HttpError(
      "Fetching notifications failed, please try again later",
      500
    );
    return next(error);
  }

  // Check if notifications exist
  if (!notifications || notifications.length === 0) {
    return res.status(404).json({ message: "There is no notifications." });
  }

  // Transform each notification to include only specific fields
  notifications = notifications.map((notification) => {
    return {
      notificationId: notification._id,
      userId: notification.userId, // Map _id to id
      message: notification.message, // Include message
      isRead: notification.isRead, // Include createdAt
      createdAt: notification.createdAt,
    };
  });

  // Return notifications
  res.status(200).json({ notifications });
};

const markAsRead = async (req, res, next) => {
  const { notificationId } = req.body;

  try {
    // Find the notification by ID and update its isRead field to true
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
    });

    // If the notification is not found, return a 404 error
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    // Return a success message
    res.status(200).json({ message: "Notification marked as read." });
  } catch (err) {
    next(new HttpError("Failed to update notification status.", 500));
  }
};

const getAllReports = async (req, res, next) => {
  const { uid } = req.params;

  try {
    // Fetch reports for each platform
    const youtubeReports = await YouTubeReport.find({ userId: uid });
    const googleMapsReports = await GoogleMapsReport.find({ userId: uid });
    const tiktokReports = await TikTokReport.find({ userId: uid });

    // Combine all reports into one array and sort by `dateOfReport` (latest first)
    const allReports = [
      ...youtubeReports,
      ...googleMapsReports,
      ...tiktokReports,
    ].sort((a, b) => new Date(b.dateOfReport) - new Date(a.dateOfReport));

    res.status(200).json({ reports: allReports });
  } catch (err) {
    console.error("Error fetching reports:", err.message);
    return next(new HttpError("Failed to retrieve reports", 500));
  }
};

exports.signup = signup;
exports.login = login;
exports.userInfo = userInfo;
exports.updateUserInfo = updateUserInfo;
exports.updatePassword = updatePassword;
exports.getNotifications = getNotifications;
exports.markAsRead = markAsRead;
exports.getAllReports = getAllReports;
