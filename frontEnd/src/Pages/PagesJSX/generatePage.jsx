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
<<<<<<< HEAD
    const [progress, setProgress] = useState(1); //create a state in the parent compoenent taking number as argument

    const handleStart = () => { 
      setProgress(99);                  // this function for when the model is working so u activate it
    };
  
    const handleComplete = () => {
      setProgress(100);        // this is for when the model finish and the report is ready
    };
=======
    const [progressBarValue, setProgressBarValue] = useState(0); //create a state in the parent compoenent taking number as argument
    const [progressBarMessage, setProgressBarMessage] = useState("");
    
    const [reportGenerated, setReportGenerated] = useState(false);
    const [rId, setRId] = useState(false);

>>>>>>> b2d75d73667d7fec5422a0d86652876f25c6d6ce

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
<<<<<<< HEAD
                    <div className="X-title generate-title">
                        Paste the <span className="highlight">TikTok</span> URL to generate sentiment analysis report
=======
                    <div className="tiktok-title generate-title">
                        Paste the <span className="highlight">Post</span> URL to generate sentiment analysis report
>>>>>>> b2d75d73667d7fec5422a0d86652876f25c6d6ce
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
<<<<<<< HEAD
                <GenerateForm platform={platform} setRequestResponse = {setRequestResponse} />
                <ProgressBar progress={progress}/>
                <div className="request-response">
                    {requestResponse}
                </div>
               

=======
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
>>>>>>> b2d75d73667d7fec5422a0d86652876f25c6d6ce
            </div>
            <Footer/>
        </div>
    )
}