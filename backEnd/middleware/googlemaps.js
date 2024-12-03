const axios = require("axios");

const HttpError = require("../models/http-error");
const GoogleMapsReport = require("../models/googlemapsReport");

// Function to fetch Google Maps details and reviews
const getPlaceDetailsAndReviews = async (url) => {
  const apiEndpoint = `https://api.apify.com/v2/actor-tasks/tasugair~google-maps-reviews-scraper-task/run-sync-get-dataset-items?token=${process.env.APIFY_API_KEY}`;

  const requestBody = {
    language: "en",
    maxReviews: 5,
    personalData: false,
    startUrls: [
      {
        url: url,
        method: "GET",
      },
    ],
  };

  try {
    const response = await axios.post(apiEndpoint, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new HttpError("No data received from the API.", 500);
    }

    // Extract required information from the response
    const placeDetails = data[0];
    const reviews = data.map((item) => item.textTranslated || item.text);

    return {
      placeTitle: placeDetails.title,
      address: placeDetails.address,
      city: placeDetails.city,
      categories: placeDetails.categories,
      rating: placeDetails.totalScore,
      numberOfReviews: placeDetails.reviewsCount,
      url: placeDetails.url,
      reviews,
    };
  } catch (err) {
    console.error("Error fetching Google Maps data:", err.message);
    throw new HttpError("Failed to fetch Google Maps details.", 500);
  }
};

// Function to save Google Maps report to the database
const saveGoogleMapsReportToDB = async ({
  userId,
  placeDetails,
  sentimentSummary,
}) => {
  try {
    const report = new GoogleMapsReport({
      userId,
      dateOfReport: new Date(),
      url: placeDetails.url,
      placeTitle: placeDetails.placeTitle,
      address: placeDetails.address,
      city: placeDetails.city,
      categories: placeDetails.categories,
      rating: placeDetails.rating,
      numberOfReviews: placeDetails.numberOfReviews,
      positiveCommentsPercentage: sentimentSummary.percentages.positive,
      neutralCommentsPercentage: sentimentSummary.percentages.neutral,
      negativeCommentsPercentage: sentimentSummary.percentages.negative,
      generalOpinion: sentimentSummary.general_opinion,
    });

    await report.save();
  } catch (err) {
    console.error("Error saving Google Maps report to database:", err.message);
    throw new HttpError("Failed to save Google Maps report to database.", 500);
  }
};

module.exports = {
  getPlaceDetailsAndReviews,
  saveGoogleMapsReportToDB,
};
