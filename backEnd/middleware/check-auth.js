// This is the token validation logic for accessing the protected paths

// Note: this logic is not needed for Sprint 1

// const jwt = require("jsonwebtoken");

// const HttpError = require("../models/http-error");

// module.exports = (req, res, next) => {
//   if (req.method === "OPTIONS") {
//     // handle the OPTIONS request that is from the browser
//     return next();
//   }
//   try {
//     const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'  <-(from the frontend)
//     if (!token) {
//       throw new Error("Authentication failed!");
//     }
//     const decodedToken = jwt.verify(token, "supersecret_dont_share"); // return the payload object
//     req.userData = { userId: decodedToken.userId }; // such that the next middlewares will use it
//     next();
//   } catch (err) {
//     const error = new HttpError("Authentication failed!", 403);
//     return next(error);
//   }
// };
