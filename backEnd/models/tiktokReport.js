const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// TikTok Schema
const tikTokReportSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateOfReport: { type: Date, required: true, default: Date.now },
  url: { type: String, required: true }, // The URL provided for the report generation
  caption: { type: String },
  date: { type: Date },
  username: { type: String },
  numberOfViews: { type: Number },
  numberOfUsersSavedToFavorites: { type: Number },
  numberOfLikes: { type: Number },
  numberOfShares: { type: Number },
  numberOfComments: { type: Number },
  commentToViewRatio: { type: Number },
  positiveCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  neutralCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  negativeCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  generalOpinion: { type: String },
  platform: { type: String, required: true, default: "TikTok" }, // Default value
});

tikTokReportSchema.plugin(uniqueValidator);

module.exports = mongoose.model("TikTokReport", tikTokReportSchema);
