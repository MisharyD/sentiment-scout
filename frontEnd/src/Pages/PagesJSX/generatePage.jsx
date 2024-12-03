import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import Header from "../../Components/Header/Header.jsx";
import GenerateForm from "../../Components/GenerateForm/GenerateForm.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/generatePage.css"
import "../PagesCSS/starsBackground.css"
import ProgressBar from '../../Components/ProgressBar/ProgressBar.jsx';

export default function GeneratePage(){
    const { platform } = useParams();
    const [requestResponse, setRequestResponse] = useState("")
    const [progressBarValue, setProgressBarValue] = useState(0); //create a state in the parent compoenent taking number as argument
    const [progressBarMessage, setProgressBarMessage] = useState("");
    
    const [reportGenerated, setReportGenerated] = useState(false);
    const [rId, setRId] = useState(false);

    //reset the request response when navigating between platforms from the header
    useEffect(() => {
        setRequestResponse("");
      }, [platform]);

    const renderTitle = () => {
        switch (platform) {
            case "youtube":
                return (
                    <div className="youtube-title generate-title">
                        Paste the <span className="highlight">Video</span> URL to generate sentiment analysis report
                    </div>
                );
            case "googlemaps":
                return (
                    <div className="maps-title generate-title">
                        Paste the <span className="highlight">Location</span> URL to generate sentiment analysis report
                    </div>
                );
            case "tiktok":
                return (
                    <div className="tiktok-title generate-title">
                        Paste the <span className="highlight">Post</span> URL to generate sentiment analysis report
                    </div>
                    
                );
        }
    }

    let formattedPlatform;
        switch(platform){
            case "youtube":
                formattedPlatform = "YouTube"
                break;
            case "tiktok":
                formattedPlatform = "TikTok"
                break;
            case "googlemaps":
                formattedPlatform = "Google Maps"
                break;
        }

    return (
        <div className="generate-page">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <Header page = "generate" />
            

            <div className="main">
                {renderTitle()}
                {/*if report is generated, display link to report page */}
                {reportGenerated && 
                (
                    <div className='report-message'>Report generated Successfully!&nbsp; 
                        <NavLink to = {`/reports/${formattedPlatform}/${rId}`} target='_blank'
                        rel="noopener noreferrer"> click here to view report</NavLink> 
                    </div>    
                )}
                {/*else display progress bar*/}
                {(progressBarValue > 0 && progressBarValue <100 && !reportGenerated) && 
                (
                    <ProgressBar progress={progressBarValue} message={progressBarMessage}/>
                )} 
                <GenerateForm platform={platform} setRequestResponse = {setRequestResponse} setProgressBarValue ={setProgressBarValue}
                 setReportGenerated={setReportGenerated} setRId={setRId} setProgressBarMessage = {setProgressBarMessage}/>
                
                {/*This is used for displaying errors */}
                <div className="request-response">
                    {requestResponse}
                </div>          
            </div>
            <Footer/>
        </div>
    )
}