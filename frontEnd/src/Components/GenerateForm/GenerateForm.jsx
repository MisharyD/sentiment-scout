
/* eslint-disable react/prop-types */
import {useState, useContext} from "react";
import { useHttpClient } from "../shared/hooks/http-hook.jsx";
import { AuthContext } from "../shared/context/auth-context.jsx";
import { OrbitProgress } from "react-loading-indicators"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./generateForm.css"

export default function GenerateForm({platform, setRequestResponse, setProgressBarValue, setProgressBarMessage, setReportGenerated, setRId}){
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const [url, setUrl] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    //state for triggering generate buttons 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //state for triggering date input
    const [generateLater, setGenerateLater] = useState(false);
    const [loading, setLoading] = useState(false);

    //state for disabling generate button when clicked
    const [generateButtonDisabled, setGenerateButtonDisabled] = useState(false)

    const handleGenerateNow = (e) => {
        e.preventDefault();

        if(!auth.isLoggedIn){
            alert("You need to be logged in");
        }
        
        if (!url) {
            alert("Please enter a URL.");
            return;
        }
        
        //reset
        setReportGenerated(false)
        setProgressBarValue(0)

        //disable button to prevent multiple requests
        setGenerateButtonDisabled(true)

        //get endpoint based on platform name
        let endpoint;
        switch(platform){
            case "youtube":
                endpoint = import.meta.env.VITE_BACKEND_URL+`reports/generateNow/youtube/${auth.userId}/Youtube?url=${url}`
                break;
            case "tiktok":
                endpoint = import.meta.env.VITE_BACKEND_URL+`reports/generateNow/tiktok/${auth.userId}/GoogleMaps?url=${url}`
                break;
            case "googlemaps":
                endpoint = import.meta.env.VITE_BACKEND_URL+`reports/generateNow/googlemaps/${auth.userId}/Tiktok?url=${url}`
                break;
        }

        //start sse connection, returns progress, message and report id when progress reaches 100
        const eventSource = new EventSource(endpoint);

    
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const progressBarValue = data.progress;
            const progressBarMessage = data.message

            //update progress bar
            setProgressBarValue(progressBarValue);
            setProgressBarMessage(progressBarMessage);
        
            if (progressBarValue >= 100) {
                //close connection when done
                eventSource.close();

                //update values
                setRId("id")
                setReportGenerated(true)
                setProgressBarValue(progressBarValue)

                //reset generate button to allow for another generation
                setGenerateButtonDisabled(false)
            }
        };
    
        eventSource.onerror = (event) => {
            console.log("error" + event);
        eventSource.close();
        };
    }

    const handleScheduleGenerate = async () => {
        if(!auth.isLoggedIn){
            alert("You need to be logged in");
        }

        if (!url || !scheduledDate) {
            alert("Please enter both a URL and a scheduled date.");
            return;
        }

        let formattedPlatform;
        switch(platform){
            case "youtube":
                formattedPlatform = "Youtube"
                break;
            case "tiktok":
                formattedPlatform = "TikTok"
                break;
            case "googlemaps":
                formattedPlatform = "Google Maps"
                break;
        }

        let endpoint;
        switch(platform){
            case "youtube":
                endpoint = import.meta.env.VITE_BACKEND_URL+`reports/generateScheduled/youtube`
                break;
            case "tiktok":
                endpoint = import.meta.env.VITE_BACKEND_URL+`reports/generateScheduled/tiktok`
                break;
            case "googlemaps":
                endpoint = import.meta.env.VITE_BACKEND_URL+`reports/generateScheduled/googlemaps`
                break;
        }

        //Send request 
        const submit = async () => {
            setLoading(true);
            try {
                const responseData = await sendRequest(
                import.meta.env.VITE_BACKEND_URL+endpoint,
                "POST", 
                JSON.stringify({
                    "userId" :auth.userId,
                    "date":scheduledDate ,
                    "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "platform":formattedPlatform,
                    "url": url}),
                {
                    "Content-Type": "application/json",
                }
                );
                setRequestResponse(`An email will be sent you at the specified time with the report`)

            } catch (err) {
                setRequestResponse(err.message)
                
                // Clear the error message after 10 seconds
                setTimeout(() => {
                    
                }, 10000); 
            }
            finally {
                setLoading(false);
            }
        };
    submit();
    }

    const toggleDate = () => {
        setGenerateLater(!generateLater)
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
                        className={`generate-now-button ${generateButtonDisabled ? "disabled" : "enabled"}`}
                        disabled = {generateButtonDisabled}
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
                            <span className="dropdown-arrow">
                                <FontAwesomeIcon icon={faCaretDown} className="caret-icon" style={{ marginLeft: '6px' }} />
                            </span>
                        </button>
                        {generateLater && (
                            <>
                            <label className="date-label">Schedule Date:</label>
                            <input
                                type="datetime-local"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="date-input"
                            />
                            <button
                                type="button"
                                onClick={handleScheduleGenerate}
                                className= {`confirm-schedule-button ${generateButtonDisabled ? "disabled" : "enabled"}`}
                                disabled = {generateButtonDisabled}
                            >
                                Confirm Schedule
                            </button>
                            </>
                        )}
                    </div>
                </>
                )}
            </div>

            {/* trigger loading indicator if loading is true */}
            {loading && (
                <div className="overlay">
                    <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
                </div>
            )}
        </form>
    )
}

GenerateForm.propTypes = {
    platform: PropTypes.string.isRequired
}