import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../Components/shared/context/auth-context.jsx";
import { useHttpClient } from "../../Components/shared/hooks/http-hook.jsx";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/generatePage.css"

export default function generatePage({platform}){

    const [url, setUrl] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [generateLater, setGenerateLater] = useState(false);

    const renderTitle = () => {
        switch (platform) {
            case "youtube":
                return (
                    <div className="youtube-title">
                        Paste the <span className="highlight">Video</span> URL to generate sentiment analysis report Comments
                    </div>
                );
            case "googleMaps":
                return (
                    <div className="maps-title">
                        Paste the <span className="highlight">Location</span> URL to generate sentiment analysis report
                    </div>
                );
            case "x":
                return (
                    <div className="X-title">
                        Paste the <span className="highlight">Tweet</span> URL to generate sentiment analysis report
                    </div>
                );
        }
    }

    const handleGenerateNow = (e) => {
        e.preventDefault();
        
        if (!url) {
            alert("Please enter a URL.");
            return;
        }

        let apiEndpoint;
        switch (platform) {
            case "youtube":
                apiEndpoint = "youtube";
                break;
            case "google maps":
                apiEndpoint = "googleMaps";
                break;
            case "x":
                apiEndpoint = "X";
                break;
        }

        //Send request 
        console.log("sending request to generate report NOW")
    }

    const handleScheduleGenerate = () => {
        if (!url || !scheduledDate) {
            alert("Please enter both a URL and a scheduled date.");
            return;
        }

        let apiEndpoint;
        switch (platform) {
            case "youtube":
                apiEndpoint = "https://api.example.com/youtube/schedule";
                break;
            case "google maps":
                apiEndpoint = "https://api.example.com/googlemaps/schedule";
                break;
            case "x":
                apiEndpoint = "https://api.example.com/x/schedule";
                break;
            default:
                alert("Invalid platform selected.");
                return;
        }

        //Send request 
        console.log("sending request to generate report LATER")
    }
    return (
        <div className="generate-page">
            {renderTitle()}

            <form className = "generate-form" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Paste the URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="url-input"
                />
                <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="generate-report-button"
                >
                    Generate Report
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button
                            type="button"
                            onClick={handleGenerateNow}
                            className="dropdown-item"
                        >
                            Generate Now
                        </button>
                        <button
                            type="button"
                            onClick={() => setGenerateLater(true)}
                            className="dropdown-item"
                        >
                            Generate Later
                        </button>
                        {generateLater && (
                            <>
                                <label>Schedule Date:</label>
                                <input
                                    type="date"
                                    value={scheduledDate}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                    className="date-input"
                                />
                                <button
                                    type="button"
                                    onClick={handleScheduleGenerate}
                                    className="schedule-button"
                                >
                                    Confirm Schedule
                                </button>
                            </>
                        )}
                    </div>
                )}
            </form>
        </div>
    )
}