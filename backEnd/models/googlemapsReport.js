const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// Google Maps Schema
const googleMapsReportSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateOfReport: { type: Date, required: true, default: Date.now },
  url: { type: String, required: true }, // The URL provided for the report generation
  placeTitle: { type: String },
  address: { type: String },
  city: { type: String },
  categories: { type: [String] },
  rating: { type: Number },
  numberOfReviews: { type: Number },
  positiveCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  neutralCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  negativeCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  generalOpinion: { type: String },
  platform: { type: String, required: true, default: "Google Maps" }, // Default value
});

googleMapsReportSchema.plugin(uniqueValidator);

module.exports = mongoose.model("GoogleMapsReport", googleMapsReportSchema);
