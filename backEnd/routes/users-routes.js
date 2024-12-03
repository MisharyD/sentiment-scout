const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Routes to the signup controller
// router.post(
//   "/signup",
//   [
//     check("name").not().isEmpty(),
//     check("email").normalizeEmail().isEmail(),
//     check("password").isLength({ min: 6 }),
//   ],
//   usersController.signup
// );

// Generate OTP for signup
router.post(
  "/signupGenerateOTP",
  [check("email").normalizeEmail().isEmail(), check("name").not().isEmpty()],
  usersController.signupGenerateOTP
);

// Verify OTP and Signup
router.post(
  "/verifyOTPAndSignup",
  [
    check("email").normalizeEmail().isEmail(),
    check("name").not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("otp").not().isEmpty(),
  ],
  usersController.verifyOTPAndSignup
);

// Routes to the login controller
router.post("/login", usersController.login);

// // Token Validation (for the protected paths bellow) (for any route bellow only the authenticated user should access it (we validate by checking the token) )
// router.use(checkAuth);

// Routes to the userInfo controller
router.get("/:uid", usersController.userInfo);

// Routes to the updateUserInfo controller
router.patch(
  "/updateUserInfo",
  [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail()],
  usersController.updateUserInfo
);

// Routes to the updatePassword controller
router.patch(
  "/updatePassword",
  [check("newPassword").isLength({ min: 6 })],
  usersController.updatePassword
);

//Routes related to user's reports
router.get("/reports/:uid", usersController.getAllReports);

// Routes related to user's notifications

// Get notifications for a user
router.get("/notifications/:uid", usersController.getNotifications);

// mark notification as read
router.patch("/notifications/markAsRead", usersController.markAsRead);

module.exports = router;
