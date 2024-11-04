import {useState, useContext} from "react";
import { AuthContext } from "../shared/context/auth-context.jsx";
import PropTypes from 'prop-types';
import "./generateForm.css"

export default function GenerateForm({platform}){
    const auth = useContext(AuthContext);

    const [url, setUrl] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [generateLater, setGenerateLater] = useState(false);

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

    const toggleDate = () => {
        setGenerateLater(!generateLater)
    }

    const handleScheduleGenerate = () => {
        if(!auth.isLoggedIn){
            alert("You need to be logged in");
        }

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
        }

        //Send request 
        console.log("sending request to generate report LATER")
    }

    return(
        <form className = "generate-form" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                placeholder="Paste the URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="url-input"
            />
            <div className="generate-buttons-container">
                <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="generate-report-button gradiant"
                >
                    Generate Report
                </button>
                {dropdownOpen && (
                    <>
                    <button
                        type="button"
                        onClick={handleGenerateNow}
                        className="generate-now-button"
                    >
                        Generate Now
                    </button>
                    <div className="schedule-container">
                        <button
                            type="button"
                            onClick={() => toggleDate()}
                            className="generate-later-button"
                        >
                            Generate Later
                        </button>
                        {generateLater && (
                            <>
                                <label className="date-label">Schedule Date:</label>
                                <input
                                    type="date"
                                    value={scheduledDate}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                    className="date-input"
                                />
                                <button
                                    type="button"
                                    onClick={handleScheduleGenerate}
                                    className="confirm-schedule-button"
                                >
                                    Confirm Schedule
                                </button>
                            </>
                        )}
                    </div>
                </>
                )}
            </div>
        </form>
    )
}

GenerateForm.propTypes = {
    platform: PropTypes.string.isRequired
}