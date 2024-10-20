// // This is the token validation logic for accessing the protected paths

// // Note: Later we use this when the frontEnd will send the token (1- better way, 2- for protecting the paths, 3- no need for dynamic userID in URL since the userID is already token's payload )

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
