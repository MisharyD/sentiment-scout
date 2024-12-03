/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState, useContext} from "react";
import { useHttpClient } from "../shared/hooks/http-hook.jsx";
import { AuthContext } from "../shared/context/auth-context.jsx";
import { OrbitProgress } from "react-loading-indicators"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./generateForm.css"

export default function GenerateForm({platform, setRequestResponse}){
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const [url, setUrl] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    //state for triggering generate buttons 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //state for triggering date input
    const [generateLater, setGenerateLater] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGenerateNow = (e) => {
        e.preventDefault();

        if(!auth.isLoggedIn){
            alert("You need to be logged in");
        }
        
        if (!url) {
            alert("Please enter a URL.");
            return;
        }

        let formattedPlatform;
        switch(platform){
            case "youtube":
                formattedPlatform = "Youtube"
                break;
            case "x":
                formattedPlatform = "X"
                break;
            case "maps":
                formattedPlatform = "Google Maps"
                break;
        }

        //Send request 
        const submit = async () => {
            setLoading(true);
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_BACKEND_URL+`users/notifications/generateNow`,
                    "POST", 
                    JSON.stringify({
                        "userId" :auth.userId,
                        "platform":formattedPlatform}),
                    {
                    "Content-Type": "application/json",
                    }
                );
                setRequestResponse("Report generated succesfully and an email has been sent to you with the report!")

            } 
            catch (err) {
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
            case "x":
                formattedPlatform = "X"
                break;
            case "maps":
                formattedPlatform = "Google Maps"
                break;
        }

        //Send request 
        const submit = async () => {
            setLoading(true);
            try {
                const responseData = await sendRequest(
                import.meta.env.VITE_BACKEND_URL+`users/notifications/generateSchedule`,
                "POST", 
                JSON.stringify({
                    "userId" :auth.userId,
                    "date":scheduledDate ,
                    "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "platform":formattedPlatform}),
                {
                    "Content-Type": "application/json",
                }
                );
                setRequestResponse(`Report generated succesfully and an email will be sent to you with the report at the 
                    specified time!`)

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