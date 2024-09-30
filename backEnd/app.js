const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

// parsing the json requests
app.use(bodyParser.json());

// for CORS handling when request denied
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// Handling Routes
app.use("/api/users", usersRoutes);

// for undefined endpoiont(routes)
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// Error Handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// DB Connection
mongoose
  .connect(
    // Note: Here you should use your username in the Atlas MongoDB after joining the cluster by providing to me your email, but using mine will work i think.
    `mongodb+srv://Tsugair27:10qpalzmTTDB@cluster0.djdmo.mongodb.net/SentimentScout?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
