/* eslint-disable react/prop-types */
import youtubeLogo from "../../assets/images/youtube.svg"
import "./youtubeReport.css"
export default function YouTubeReport({reportInfo}){

    return(
        <div className="report-page-content">
            {/* Header Section */}
            <header className="report-header">
                <h1>SENTIMENT SCOUT</h1>
                <h2>YouTube Sentiment Analysis Report</h2>
                <img
                    src={youtubeLogo} // Replace with the correct path for your YouTube logo
                    alt="YouTube Logo"
                />
            </header>

            {/* Report Overview Section */}
            <section>
                <h3 className="report-section-title">Report Overview</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Date of Report:</span>{" "}
                    {new Date(reportInfo.dateOfReport).toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Purpose:</span> Sentiment
                    analysis of YouTube video comments to extract insights about viewer feedback.
                </p>
            </section>

            {/* Sentiment Analysis Overview Section */}
            <section>
                <h3 className="report-section-title">Sentiment Analysis Overview</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Sentiment Distribution:</span>
                </p>
                <ul className="report-list">
                    <li>
                        Positive Comments: {reportInfo.positiveCommentsPercentage}
                    </li>
                    <li>
                        Neutral Comments: {reportInfo.neutralCommentsPercentage}
                    </li>
                    <li>
                        Negative Comments: {reportInfo.negativeCommentsPercentage}
                    </li>
                </ul>
                <p className="report-section-content">
                    <span className="font-semibold">General Insights:</span>{" "}
                    {reportInfo.generalOpinion}
                </p>
            </section>

            {/* Video Details Section */}
            <section>
                <h3 className="report-section-title">Video Details</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Video Title:</span>{" "}
                    <a
                        href={reportInfo.url}
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {reportInfo.videoTitle}
                    </a>
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Date of Video:</span>{" "}
                    {new Date(reportInfo.dateOfVideo).toLocaleDateString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Channel Name:</span>{" "}
                    {reportInfo.channelName}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Subscribers:</span>{" "}
                    {reportInfo.numberOfSubscribers.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Views:</span>{" "}
                    {reportInfo.numberOfViews.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Likes:</span>{" "}
                    {reportInfo.numberOfLikes.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Comments:</span>{" "}
                    {reportInfo.numberOfComments.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Comment-to-View Ratio:</span>{" "}
                    {reportInfo.commentToViewRatio.toFixed(2)}
                </p>
            </section>
        </div>
    )
}