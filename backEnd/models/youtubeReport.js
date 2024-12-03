const mongoose = require("mongoose");

const youtubeReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true }, // The URL provided for the report generation
  dateOfReport: { type: Date, required: true, default: Date.now },
  videoTitle: { type: String },
  dateOfVideo: { type: Date },
  channelName: { type: String },
  numberOfSubscribers: { type: Number },
  numberOfViews: { type: Number },
  numberOfLikes: { type: Number },
  numberOfComments: { type: Number },
  commentToViewRatio: { type: Number },
  positiveCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  neutralCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  negativeCommentsPercentage: { type: String }, // Store as string, e.g., "40.0%"
  generalOpinion: { type: String },
  platform: { type: String, required: true, default: "YouTube" }, // Default value
});

module.exports = mongoose.model("YouTubeReport", youtubeReportSchema);
