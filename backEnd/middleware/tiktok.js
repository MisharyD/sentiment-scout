const axios = require("axios");

const HttpError = require("../models/http-error");
const TikTokReport = require("../models/tiktokReport");

// Function to fetch TikTok video details
const getTikTokVideoDetails = async (url) => {
  const apiEndpoint = `https://api.apify.com/v2/actor-tasks/tasugair~tiktok-data-extractor-task/run-sync-get-dataset-items?token=${process.env.APIFY_API_KEY}`;

  const requestBody = {
    postURLs: [url],
  };

  try {
    const response = await axios.post(apiEndpoint, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new HttpError("No data received from the TikTok API.", 500);
    }

    const videoDetails = data[0];

    return {
      caption: videoDetails.text,
      date: videoDetails.createTimeISO,
      username: videoDetails.authorMeta.name,
      numberOfViews: videoDetails.playCount,
      numberOfUsersSavedToFavorites: videoDetails.collectCount,
      numberOfLikes: videoDetails.diggCount,
      numberOfShares: videoDetails.shareCount,
      numberOfComments: videoDetails.commentCount,
      commentToViewRatio:
        (videoDetails.commentCount / videoDetails.playCount) * 100,
    };
  } catch (err) {
    console.error("Error fetching TikTok video details:", err.message);
    throw new HttpError("Failed to fetch TikTok video details.", 500);
  }
};

// Function to fetch TikTok comments
const getTikTokComments = async (url) => {
  const apiEndpoint = `https://api.apify.com/v2/acts/clockworks~tiktok-comments-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_API_KEY}`;

  const requestBody = {
    commentsPerPost: 10,
    maxRepliesPerComment: 0,
    postURLs: [url],
  };

  try {
    const response = await axios.post(apiEndpoint, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new HttpError("No comments received from the TikTok API.", 500);
    }

    const comments = data.map((comment) => comment.text);

    return comments;
  } catch (err) {
    console.error("Error fetching TikTok comments:", err.message);
    throw new HttpError("Failed to fetch TikTok comments.", 500);
  }
};

// Function to save TikTok report to the database
const saveTikTokReportToDB = async ({
  userId,
  videoDetails,
  sentimentSummary,
  url,
}) => {
  try {
    const report = new TikTokReport({
      userId,
      dateOfReport: new Date(),
      url,
      caption: videoDetails.caption,
      date: videoDetails.date,
      username: videoDetails.username,
      numberOfViews: videoDetails.numberOfViews,
      numberOfUsersSavedToFavorites: videoDetails.numberOfUsersSavedToFavorites,
      numberOfLikes: videoDetails.numberOfLikes,
      numberOfShares: videoDetails.numberOfShares,
      numberOfComments: videoDetails.numberOfComments,
      commentToViewRatio: videoDetails.commentToViewRatio.toFixed(2),
      positiveCommentsPercentage: sentimentSummary.percentages.positive,
      neutralCommentsPercentage: sentimentSummary.percentages.neutral,
      negativeCommentsPercentage: sentimentSummary.percentages.negative,
      generalOpinion: sentimentSummary.general_opinion,
    });

    const savedReport = await report.save(); // Save to the database
    return savedReport._id; // Return the ID of the saved report
  } catch (err) {
    console.error("Error saving TikTok report to database:", err.message);
    throw new HttpError("Failed to save TikTok report to database.", 500);
  }
};

module.exports = {
  getTikTokVideoDetails,
  getTikTokComments,
  saveTikTokReportToDB,
};
