import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import YoutubeReport from "../../Components/YoutubeReport/YoutubeReport.jsx"
import TikTokReport from "../../Components/TikTokReport/TikTokReport.jsx"
import GoogleMapsReport from "../../Components/GoogleMapsReport/GoogleMapsReport.jsx"
import "../PagesCSS/reportPage.css"; // Import the CSS file
import "../../index.css"
import "../PagesCSS/starsBackground.css"

export default function ReportPage() {
    const { platform, rId } = useParams(); // Extract the platform and report ID from the URL
    const [reportInfo, setReportInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(import.meta.env.VITE_BACKEND_URL+`reports/${platform}/${rId}`);
                const data = await response.json();
                setReportInfo(data.report);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportData();
    }, [platform, rId]);

    // Choose the correct component based on the platform
    const renderReportComponent = () => {
        switch (platform) {
            case "YouTube":
                return <YoutubeReport reportInfo={reportInfo} />;
            case "TikTok":
                return <TikTokReport reportInfo={reportInfo} />;

            case "Google Maps":
                return <GoogleMapsReport reportInfo={reportInfo} />;
        }
    };  

    return (
        <div className="report-page">
            <div className="button-and-report-container">
                {isLoading ? (
                    <p>Loading report...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    renderReportComponent()
                )}
            </div>
        </div>
    );
}
