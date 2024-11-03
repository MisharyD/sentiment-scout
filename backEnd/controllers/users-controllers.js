const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const sendMail = require('../middleware/mailer');


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
  });

  try {
    await createdUser.save();
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
      "Could not find place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ name: user.name, email: user.email });
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


const sendEmailforGenerateNow = async (req, res, next) => {
  const userId = req.body.userId 
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('User lookup failed', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('User not found', 404);
    return next(error);
  }


// Send email to the user
try {
  await sendMail(
    user.email,
    user.name,
    'Your Report is Ready',
    `Hello ${user.name}, your report has been generated. Thanks for using Sentiment Scout. Waiting for your next report !!`,
    `<h2>Hello ${user.name}!</h2>
      <h3>Your report has been generated.</h3>
      <p>Thanks for using Sentiment Scout. Waiting for your next report !!</p>
      `
  );
  res.status(200).json({ message: 'Email sent successfully!' });
} catch (err) {
  const error = new HttpError('Failed to send email', 500);
  return next(error);
}
};



exports.signup = signup;
exports.login = login;
exports.userInfo = userInfo;
exports.updateUserInfo = updateUserInfo;
exports.updatePassword = updatePassword;
exports.sendEmailforGenerateNow = sendEmailforGenerateNow;
