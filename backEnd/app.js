require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const agenda = require("./middleware/agenda");

const usersRoutes = require("./routes/users-routes");
const reportsRoutes = require("./routes/reports-routes");
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
app.use("/api/reports", reportsRoutes);

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
    `mongodb+srv://Tsugair27:10qpalzmTTDB@cluster0.djdmo.mongodb.net/SentimentScout?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    // Start Agenda after the database is connected
    await agenda.start();
    console.log("Agenda started");

    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
