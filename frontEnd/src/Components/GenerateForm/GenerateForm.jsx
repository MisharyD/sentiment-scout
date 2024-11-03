import {useState} from "react";
import PropTypes from 'prop-types';

export default function GenerateForm({platform}){

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
    )
}

GenerateForm.propTypes = {
    platform: PropTypes.string.isRequired
}