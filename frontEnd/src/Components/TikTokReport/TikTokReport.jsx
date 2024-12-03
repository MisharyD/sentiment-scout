/* eslint-disable react/prop-types */
import "./tikTokReport.css"
import tikTokLogo from "../../assets/images/tiktok-logo.svg"
export default function TikTokReport({ reportInfo }) {
    return (
        <div className="report-page-content">
            {/* Header Section */}
            <header className="report-header">
                <h1>SENTIMENT SCOUT</h1>
                <h2>TikTok Sentiment Analysis Report</h2>
                <img
                    src= {tikTokLogo} // Replace with the correct path for your TikTok logo
                    alt="TikTok Logo"
                    className="tiktok-logo"
                />
            </header>

            {/* Sentiment Analysis Overview Section */}
            <section>
                <h3 className="report-section-title">Sentiment Analysis Overview</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Sentiment Distribution:</span>
                </p>
                <ul className="report-list">
                    <li>Positive Comments: {reportInfo.positiveCommentsPercentage}</li>
                    <li>Neutral Comments: {reportInfo.neutralCommentsPercentage}</li>
                    <li>Negative Comments: {reportInfo.negativeCommentsPercentage}</li>
                </ul>
                <p className="report-section-content">
                    <span className="font-semibold">General Insights:</span> {reportInfo.generalOpinion}
                </p>
            </section>

            {/* Report Overview Section */}
            <section>
                <h3 className="report-section-title">Report Overview</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Date of Report:</span> {new Date(reportInfo.dateOfReport).toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Purpose:</span> Sentiment analysis of TikTok comments to extract insights about viewer feedback.
                </p>
            </section>

            {/* Post Details Section */}
            <section>
                <h3 className="report-section-title">Post Details</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Caption:</span> <a href={reportInfo.url} className="text-blue-400 underline">{reportInfo.caption}</a>
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Date:</span> {new Date(reportInfo.date).toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Username:</span> {reportInfo.username}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Views:</span> {reportInfo.numberOfViews.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Likes:</span> {reportInfo.numberOfLikes.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Shares:</span> {reportInfo.numberOfShares.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Comments:</span> {reportInfo.numberOfComments.toLocaleString()}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Comment-to-View Ratio:</span> {reportInfo.commentToViewRatio}
                </p>
            </section>
        </div>
    );
}