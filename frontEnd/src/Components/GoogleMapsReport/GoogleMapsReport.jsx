/* eslint-disable react/prop-types */
import mapsLogo from "../../assets/images/google-maps.svg"
export default function Report({ reportInfo }) {
    return (
        <div className="report-page-content">
            {/* Header Section */}
            <header className="report-header">
                <h1>SENTIMENT SCOUT</h1>
                <h2>Google Maps Sentiment Analysis Report</h2>
                <img
                    src={mapsLogo} // Replace with the correct path for your Google Maps logo
                    alt="Google Maps Logo"
                    className="maps-logo"
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
                    <span className="font-semibold">Purpose:</span> Sentiment analysis of Google Maps reviews to extract insights about reviewer feedback.
                </p>
            </section>

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
                    <span className="font-semibold">General Insights:</span>{" "}
                    {reportInfo.generalOpinion}
                </p>
            </section>

            {/* Place Details Section */}
            <section>
                <h3 className="report-section-title">Place Details</h3>
                <p className="report-section-content">
                    <span className="font-semibold">Place Title:</span>{" "}
                    <a
                        href={reportInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                    >
                        {reportInfo.placeTitle}
                    </a>
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Address:</span>{" "}
                    <span>{reportInfo.address}</span>
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">City:</span> {reportInfo.city}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Categories:</span>{" "}
                    {reportInfo.categories.join(", ")}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Rating:</span> {reportInfo.rating}
                </p>
                <p className="report-section-content">
                    <span className="font-semibold">Number of Reviews:</span>{" "}
                    {reportInfo.numberOfReviews}
                </p>
            </section>
        </div>
    );
}
