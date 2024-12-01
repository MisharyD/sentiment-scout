import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import Header from "../../Components/Header/Header.jsx";
import GenerateForm from "../../Components/GenerateForm/GenerateForm.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/generatePage.css"
import "../PagesCSS/starsBackground.css"
import ProgressBar from '../../Components/ProgressBar/ProgressBar.jsx';
export default function GeneratePage(){
    const { platform } = useParams();
    const [requestResponse, setRequestResponse] = useState("")
    // const [progress, setProgress] = useState(1); //create a state in the parent compoenent taking number as argument

    // const handleStart = () => { 
    //   setProgress(99);                  // this function for when the model is working so u activate it
    // };
  
    // const handleComplete = () => {
    //   setProgress(100);        // this is for when the model finish and the report is ready
    // };

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
            case "maps":
                return (
                    <div className="maps-title generate-title">
                        Paste the <span className="highlight">Location</span> URL to generate sentiment analysis report
                    </div>
                );
            case "x":
                return (
                    <div className="X-title generate-title">
                        Paste the <span className="highlight">Tweet</span> URL to generate sentiment analysis report
                    </div>
                    
                );
        }
    }

    return (
        <div className="generate-page">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <Header page = "generate" />
            

            <div className="main">
                {renderTitle()}
                <GenerateForm platform={platform} setRequestResponse = {setRequestResponse} />
                <div className="request-response">
                    {requestResponse}
                </div>
                {/* <ProgressBar progress={progress}/>
                <button style={{width:"40%"}} onClick={handleStart}></button> */}
            </div>
            <Footer/>
        </div>
    )
}