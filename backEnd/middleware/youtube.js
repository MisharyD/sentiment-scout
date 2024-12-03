const axios = require("axios");

const HttpError = require("../models/http-error");
const YouTubeReport = require("../models/youtubeReport");

// Extract video details
const getVideoDetails = async (videoUrl) => {
  const videoId = videoUrl.split("v=")[1].split("&")[0]; // Extract video ID
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
    );

    const videoData = response.data.items[0];
    const channelId = videoData.snippet.channelId;

    return {
      videoId,
      title: videoData.snippet.title,
      date: videoData.snippet.publishedAt,
      channelName: videoData.snippet.channelTitle,
      views: parseInt(videoData.statistics.viewCount, 10),
      likes: parseInt(videoData.statistics.likeCount, 10),
      commentsCount: parseInt(videoData.statistics.commentCount, 10),
      channelId,
    };
  } catch (err) {
    const error = new HttpError("Failed to fetch video details.", 500);
    return next(error);
  }
};

// Extract video comments
const getComments = async (videoId, maxResults = 10) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=${maxResults}`
    );

    return response.data.items.map(
      (item) => item.snippet.topLevelComment.snippet.textOriginal
    );
  } catch (err) {
    const error = new HttpError("Failed to fetch comments.", 500);
    return next(error);
  }
};

// Fetch channel subscriber count
const getChannelSubscribers = async (channelId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );

    const subscriberCount = parseInt(
      response.data.items[0].statistics.subscriberCount,
      10
    );

    return subscriberCount;
  } catch (err) {
    const error = new HttpError("Failed to fetch subscriber count.", 500);
    return next(error);
  }
};

// Save the report to the database
const saveReportToDB = async ({
  userId,
  videoDetails,
  sentimentSummary,
  url,
}) => {
  try {
    const report = new YouTubeReport({
      userId,
      url,
      dateOfReport: new Date(),
      videoTitle: videoDetails.title,
      dateOfVideo: videoDetails.date,
      channelName: videoDetails.channelName,
      numberOfSubscribers: videoDetails.subscribers,
      numberOfViews: videoDetails.views,
      numberOfLikes: videoDetails.likes,
      numberOfComments: videoDetails.commentsCount,
      commentToViewRatio:
        (videoDetails.commentsCount / videoDetails.views) * 100,
      positiveCommentsPercentage: sentimentSummary.percentages.positive,
      neutralCommentsPercentage: sentimentSummary.percentages.neutral,
      negativeCommentsPercentage: sentimentSummary.percentages.negative,
      generalOpinion: sentimentSummary.general_opinion,
    });

    await report.save();
  } catch (err) {
    const error = new HttpError("Failed to save report to database.", 500);
    return next(error);
  }
};

module.exports = {
  getVideoDetails,
  getComments,
  getChannelSubscribers,
  saveReportToDB,
};
